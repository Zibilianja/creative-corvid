import { Day, Month } from '@/models';
import { days, months } from '@/utils';

class CalendarDate {
  year: number;
  month: number;
  date: number;
  day: number;

  constructor(date: Date = new Date()) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    this.year = date.getUTCFullYear();
    this.month = date.getUTCMonth();
    this.date = date.getUTCDate();
    this.day = date.getUTCDay();
  }

  getMonth(): { name: string; short: string; days: number; value: number } {
    return months[this.month];
  }

  getDay(): { name: string; short: string; value: number } {
    return days[this.day];
  }

  getDate(): number {
    return this.date;
  }

  getFullDate(): Date {
    return new Date(this.year, this.month, this.date);
  }

  getFullDateAsString(): string {
    const _month =
      `${this.month + 1}`.length === 1
        ? `0${this.month + 1}`
        : `${this.month + 1}`;
    const _date =
      `${this.date}`.length === 1 ? `0${this.date}` : `${this.date}`;
    return `${_month}/${_date}/${this.year}`;
    // if (this.month < 9 && this.date < 10) {
    // return `${this.year}-0${this.month + 1}-0${this.date}`;
    //   return `0${this.month + 1}/0${this.date}/${this.year}`;
    // }
    // if (this.month < 9) {
    // return `${this.year}-0${this.month + 1}-${this.date}`;
    //   return `0${this.month + 1}/${this.date}/${this.year}`;
    // }
    // return `${this.year}-${this.month + 1}-${this.date}`;
    // return `${this.month + 1}/${this.date}/${this.year}`;
  }
}

class Calendar {
  private _currentDate: CalendarDate = new CalendarDate();
  private _activeDate: CalendarDate = new CalendarDate();
  private _dates: CalendarDate[] = [];
  private _currentMonth: Month;
  private _activeMonth: Month;
  private _nextMonth: Month = new Month(months[0], 0);
  private _previousMonth: Month = new Month(months[0], 0);

  constructor() {
    this._currentMonth = new Month(
      months[this._currentDate.month],
      this._currentDate.year
    );
    this._activeMonth = new Month(
      months[this._activeDate.month],
      this._activeDate.year
    );
    this.setPreviousMonth();
    this.setNextMonth();
    this.setDates();
  }

  get currentDate(): CalendarDate {
    return this._currentDate;
  }

  set currentDate(date: Date) {
    this._currentDate.year = date.getUTCFullYear();
    this._currentDate.month = date.getUTCMonth();
    this._currentDate.date = date.getUTCDate();
    this._currentDate.day = date.getUTCDay();
  }

  get currentMonth(): Month {
    return this._currentMonth;
  }

  get activeDate(): CalendarDate {
    return this._activeDate;
  }

  set activeDate(date: Date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    this._activeDate.year = date.getUTCFullYear();
    this._activeDate.month = date.getUTCMonth();
    this._activeDate.date = date.getUTCDate();
    this._activeDate.day = date.getUTCDay();
  }

  get dates(): CalendarDate[] {
    return this._dates;
  }

  get previousMonth(): Month {
    return this._previousMonth ? this._previousMonth : new Month(months[0], 0);
  }

  get nextMonth(): Month {
    return this._nextMonth ? this._nextMonth : new Month(months[0], 0);
  }

  get activeMonth(): Month {
    return this._activeMonth;
  }

  setActiveDate(date: string) {
    const [month, day, year] = date.split('/');
    this._activeDate.year = parseInt(year);
    this._activeDate.month = parseInt(month) - 1;
    this._activeDate.date = parseInt(day);
    this._activeDate.day = new Date(
      this._activeDate.year,
      this._activeDate.month,
      this._activeDate.date
    ).getUTCDay();

    this.setActiveMonth();
    this.setPreviousMonth();
    this.setNextMonth();
    this.setDates();
  }

  getActiveYear(): number {
    return this._activeDate.year;
  }

  getActiveMonth(): number {
    return this._activeDate.month;
  }

  getActiveDate(): number {
    return this._activeDate.date;
  }

  getCurrentMonth(): {
    name: string;
    short: string;
    days: number;
    value: number;
  } {
    const month = months[this._activeDate.month];
    return month;
  }

  updateActiveDate(increment: number) {
    if (increment === 1) this.incrementActiveDate();
    if (increment === -1) this.decrementActiveDate();
    this.setPreviousMonth();
    this.setNextMonth();
    this.setDates();
  }

  updateActiveMonth(year: number, month: number, date: number) {
    this._activeMonth = new Month(months[month - 1], year);
    this._activeDate.month = month - 1;
    this._activeDate.date = date;
    this._activeDate.day = new Date(
      this._activeDate.year,
      this._activeDate.month,
      this._activeDate.date
    ).getUTCDay();
    console.log(this._activeDate);
    this.setPreviousMonth();
    this.setNextMonth();
    this.setDates();
  }

  resetActiveDate(year: number, month: number, date: number) {
    this._activeMonth = new Month(months[month - 1], year);
    this._activeDate.year = year;
    this._activeDate.month = month - 1;
    this._activeDate.date = date;
    this._activeDate.day = new Date(
      this._activeDate.year,
      this._activeDate.month,
      this._activeDate.date
    ).getUTCDay();
    this.setPreviousMonth();
    this.setNextMonth();
    this.setDates();
  }

  updateActiveYear(year: number) {
    this._activeDate.year = year;
    this._activeDate.day = new Date(
      this._activeDate.year,
      this._activeDate.month,
      this._activeDate.date
    ).getUTCDay();
    this.setPreviousMonth();
    this.setNextMonth();
    this.setDates();
  }

  private setActiveMonth() {
    this._activeMonth = new Month(
      months[this.activeDate.month],
      this.activeDate.year
    );
  }

  private setDates() {
    this._dates = [];
    this._dates = this.getPreviousMonthDates();
    this._dates = this._dates.concat(this.getActiveMonthDates());
    this._dates = this._dates.concat(this.getNextMonthDates());
  }

  private incrementActiveDate() {
    if (this.activeDate.month === 11) {
      this._activeDate = new CalendarDate(
        new Date(this.activeDate.year + 1, 0, 1)
      );
      this._activeMonth = new Month(months[0], this.activeDate.year + 1);
    } else {
      this._activeDate = new CalendarDate(
        new Date(this.activeDate.year, this.activeDate.month + 1, 1)
      );
      this._activeMonth = new Month(
        months[this.activeDate.month],
        this.activeDate.year
      );
      if (
        this.activeMonth.value === 1 &&
        !this.isLeapYear() &&
        this._activeMonth.days > 28
      ) {
        this._activeMonth.days = 28;
      }
    }
    if (this.activeMonth.value === 1 && this.isLeapYear()) {
      this._activeMonth.days = 29;
    }
  }

  private decrementActiveDate() {
    if (this.activeDate.month === 0) {
      this._activeDate = new CalendarDate(
        new Date(this.activeDate.year - 1, 11, 1)
      );
      this._activeMonth = new Month(months[11], this.activeDate.year - 1);
    } else {
      this._activeDate = new CalendarDate(
        new Date(this.activeDate.year, this.activeDate.month - 1, 1)
      );
      this._activeMonth = new Month(
        months[this.activeDate.month],
        this.activeDate.year
      );
      if (
        this.activeMonth.value === 1 &&
        !this.isLeapYear() &&
        this._activeMonth.days > 28
      ) {
        this._activeMonth.days = 28;
      }
    }
    if (this.activeMonth.value === 1 && this.isLeapYear()) {
      this._activeMonth.days = 29;
    }
  }

  private setNextMonth() {
    const next = this.activeDate.month + 1;
    if (next >= 11) {
      this._nextMonth = new Month(months[0], this.activeDate.year + 1);
    } else {
      this._nextMonth = new Month(months[next], this.activeDate.year);
      if (this._nextMonth.value === 1 && this.isLeapYear()) {
        this._nextMonth.days = 29;
      }
      if (this._nextMonth.value === 1 && !this.isLeapYear()) {
        this._nextMonth.days = 28;
      }
    }
  }

  private setPreviousMonth() {
    const prev = this.activeDate.month - 1;
    if (prev < 0) {
      this._previousMonth = new Month(months[11], this.activeDate.year - 1);
    } else {
      this._previousMonth = new Month(months[prev], this.activeDate.year);
      if (this.previousMonth.value === 1 && this.isLeapYear()) {
        this._previousMonth.days = 29;
      }
      if (this.previousMonth.value === 1 && !this.isLeapYear()) {
        this._previousMonth.days = 28;
      }
    }
  }

  private isLeapYear(): boolean {
    return this.activeDate.year % 100 == 0
      ? this.activeDate.year % 400 == 0
      : this.activeDate.year % 4 == 0;
  }

  private getActiveMonthFirstDay(): Day {
    const date = new Date(this.activeDate.year, this.activeDate.month, 1);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return new Day(days[date.getDay()]);
  }

  private getActiveMonthLastDay(): Day {
    if (this.activeMonth.value === 1 && this.isLeapYear()) {
      this.activeMonth.days = 29;
    }

    const date = new Date(
      this.activeDate.year,
      this.activeDate.month,
      this.activeMonth.days
    );
    return new Day(days[date.getDay()]);
  }

  private getActiveMonthDates(): CalendarDate[] {
    const dates = [];
    let activeMonthDays = this.activeMonth.days;
    if (this.activeMonth.value === 1 && this.isLeapYear()) {
      activeMonthDays = 29;
    }
    for (let i = 1; i <= activeMonthDays; i++) {
      const date = new Date(this.activeDate.year, this.activeDate.month, i);
      dates.push(new CalendarDate(date));
    }
    return dates;
  }

  private getPreviousMonthDates(): CalendarDate[] {
    const dates = [];
    const previousMonthLastDay = new Date(
      this.previousMonth.year,
      this.previousMonth.value,
      this.previousMonth.days
    );
    const prevDay = new Day(days[previousMonthLastDay.getDay()]);

    if (prevDay.value < 6) {
      const activeMonthFirstDay = this.getActiveMonthFirstDay();
      const num = this.previousMonth.days - activeMonthFirstDay.value;
      for (let i = num; i <= this.previousMonth.days; i++) {
        const year =
          this.previousMonth.value === 11
            ? this._activeDate.year - 1
            : this._activeDate.year;
        const date = new Date(year, this.previousMonth.value, i);
        dates.push(new CalendarDate(date));
      }
    }
    return dates;
  }

  private getNextMonthDates(): CalendarDate[] {
    const dates = [];
    let daysToAdd = 6 - this.getActiveMonthLastDay().value;
    if (daysToAdd == -1) {
      daysToAdd = 6;
    }
    for (let i = 0; i < daysToAdd; i++) {
      const year =
        this.nextMonth.value === 0
          ? this._activeDate.year + 1
          : this._activeDate.year;
      const date = new Date(year, this.nextMonth.value, i + 1);
      dates.push(new CalendarDate(date));
    }
    return dates;
  }
}

export { Calendar };
