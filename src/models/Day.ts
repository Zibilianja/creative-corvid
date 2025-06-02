class Day {
  name: string;
  short: string;
  value: number;

  constructor(day: any) {
    this.name = day.name;
    this.short = day.short;
    this.value = day.value;
  }
}
export { Day };
