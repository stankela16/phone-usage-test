document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');

    class Calendar {
        constructor(element) {
            this.element = element;
            this.currentDate = new Date();
            this.selectedDay = null;
            this.render();
        }

        render() {
            this.element.innerHTML = '';
            const month = this.currentDate.toLocaleString('default', { month: 'long' });
            const year = this.currentDate.getFullYear();
            const header = document.createElement('h2');
            header.textContent = `${month} ${year}`;
            this.element.appendChild(header);

            // Navigation
            const nav = document.createElement('div');
            nav.className = 'navigation';
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '<';
            prevBtn.className = 'button';
            prevBtn.onclick = () => this.changeMonth(-1);
            const nextBtn = document.createElement('button');
            nextBtn.textContent = '>';
            nextBtn.className = 'button';
            nextBtn.onclick = () => this.changeMonth(1);
            nav.appendChild(prevBtn);
            nav.appendChild(nextBtn);
            this.element.appendChild(nav);

            const daysInMonth = new Date(year, this.currentDate.getMonth() + 1, 0).getDate();
            const firstDay = new Date(year, this.currentDate.getMonth(), 1).getDay();

            const daysContainer = document.createElement('div');
            daysContainer.className = 'days-container';

            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                daysContainer.appendChild(emptyDay);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.textContent = day;
                dayElement.className = 'day';
                if (this.selectedDay === day && this.currentDate.getMonth() === this.selectedMonth && this.currentDate.getFullYear() === this.selectedYear) {
                    dayElement.classList.add('selected');
                }
                dayElement.addEventListener('click', () => this.selectDate(day));
                daysContainer.appendChild(dayElement);
            }

            this.element.appendChild(daysContainer);
        }

        selectDate(day) {
            this.selectedDay = day;
            this.selectedMonth = this.currentDate.getMonth();
            this.selectedYear = this.currentDate.getFullYear();
            alert(`Izabrali ste datum: ${day} ${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`);
            this.render();
        }

        changeMonth(offset) {
            this.currentDate.setMonth(this.currentDate.getMonth() + offset);
            this.render();
        }
    }

    const calendar = new Calendar(calendarElement);
});
