import { FormatDate } from './format-date';

export class FullFormat extends FormatDate {
  constructor(public date: Date, public dateFormated: string) {
    super(date);
  }

  vertical() {
    return this.dateFormated;
  }
}
