class Calendar {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.date = new Date();
        this.render();
    }

    render() {
        this.element.innerHTML = '';
        // Header izvan grid wrappera
        this.element.appendChild(this.createHeader());
        // Grid wrapper za dane i datume
        const calendarWrapper = document.createElement('div');
        calendarWrapper.className = 'calendar';
        calendarWrapper.appendChild(this.createDays());
        calendarWrapper.appendChild(this.createDates());
        this.element.appendChild(calendarWrapper);
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <button id="prev" onclick="calendar.changeMonth(-1)">&#10094;</button>
            <span>${this.date.toLocaleString('default', { month: 'long' })} ${this.date.getFullYear()}</span>
            <button id="next" onclick="calendar.changeMonth(1)">&#10095;</button>
        `;
        return header;
    }

    createDays() {
        const days = document.createElement('div');
        days.className = 'calendar-days';
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.innerText = day;
            days.appendChild(dayElement);
        });
        return days;
    }

    createDates() {
        const dates = document.createElement('div');
        dates.className = 'calendar-dates';
        const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'date empty';
            dates.appendChild(emptyElement);
        }

        for (let date = 1; date <= lastDate; date++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'date';
            dateElement.innerText = date;
            dateElement.onclick = () => this.selectDate(date);
            dates.appendChild(dateElement);
        }

        return dates;
    }

    changeMonth(direction) {
        this.date.setMonth(this.date.getMonth() + direction);
        this.render();
    }

    selectDate(date) {
        alert(`Selected date: ${date} ${this.date.toLocaleString('default', { month: 'long' })} ${this.date.getFullYear()}`);
    }
}

const calendar = new Calendar('calendar');