document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('calendar');

    class CalendarUI {
        constructor(rootEl) {
            this.root = rootEl;
            this.viewDate = new Date();
            this.selected = null; // {year, month, day}
            this.render();
        }

        render() {
            this.root.innerHTML = '';
            const container = document.createElement('div');
            container.className = 'calendar-container';

            container.appendChild(this._createHeader());
            container.appendChild(this._createWeekdays());
            container.appendChild(this._createDatesGrid());

            this.root.appendChild(container);
        }

        _createHeader() {
            const header = document.createElement('div');
            header.className = 'calendar-header card';

            const prev = document.createElement('button');
            prev.className = 'nav-button';
            prev.innerHTML = '&#8249;';
            prev.title = 'Previous month';
            prev.addEventListener('click', () => this.changeMonth(-1));

            const next = document.createElement('button');
            next.className = 'nav-button';
            next.innerHTML = '&#8250;';
            next.title = 'Next month';
            next.addEventListener('click', () => this.changeMonth(1));

            const title = document.createElement('div');
            title.className = 'month-year';
            title.textContent = `${this.viewDate.toLocaleString('default', { month: 'long' })} ${this.viewDate.getFullYear()}`;

            header.appendChild(prev);
            header.appendChild(title);
            header.appendChild(next);

            return header;
        }

        _createWeekdays() {
            const wk = document.createElement('div');
            wk.className = 'weekdays card';
            const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            names.forEach(n => {
                const d = document.createElement('div');
                d.className = 'weekday';
                d.textContent = n;
                wk.appendChild(d);
            });
            return wk;
        }

        _createDatesGrid() {
            const grid = document.createElement('div');
            grid.className = 'dates-grid card';

            const year = this.viewDate.getFullYear();
            const month = this.viewDate.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();

            // Empty slots
            for (let i = 0; i < firstDay; i++) {
                const empty = document.createElement('div');
                empty.className = 'date-cell empty';
                grid.appendChild(empty);
            }

            for (let d = 1; d <= lastDate; d++) {
                const cell = document.createElement('div');
                cell.className = 'date-cell';

                const circle = document.createElement('div');
                circle.className = 'date-circle';
                circle.textContent = d;

                const isToday = this._isToday(year, month, d);
                if (isToday) circle.classList.add('today');

                if (this.selected && this.selected.year === year && this.selected.month === month && this.selected.day === d) {
                    circle.classList.add('selected');
                }

                circle.addEventListener('click', () => this._onSelect(year, month, d, circle));

                cell.appendChild(circle);
                grid.appendChild(cell);
            }

            return grid;
        }

        _onSelect(year, month, day, circleEl) {
            // clear previous selection
            const prev = this.root.querySelector('.date-circle.selected');
            if (prev) prev.classList.remove('selected');

            circleEl.classList.add('selected');
            this.selected = { year, month, day };
            // small feedback - can be replaced with a detail pane
            console.log('Selected', `${day}-${month+1}-${year}`);
        }

        _isToday(y, m, d) {
            const t = new Date();
            return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
        }

        changeMonth(delta) {
            this.viewDate.setMonth(this.viewDate.getMonth() + delta);
            this.render();
        }
    }

    new CalendarUI(root);
});