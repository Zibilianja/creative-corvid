class Month {
  name: string;
  short: string;
  days: number;
  value: number;
  year: number;

  constructor(month: any, year: number) {
    this.name = month.name;
    this.short = month.short;
    this.days = month.days;
    this.value = month.value;
    this.year = year;
  }
}
export { Month };
