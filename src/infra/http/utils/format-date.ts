export class FormatDate {
  constructor(protected date: Date) {
    this.date = new Date(date.toISOString().replace('Z', ''));
  }

  fullFormat(type: 'horizontal' | 'vertical' = 'horizontal'): string {
    let dateFormated = this.date
      .toLocaleString()
      .replace(',', ' -')
      .replace(':', 'h')
      .split(':')[0];

    if (type == 'vertical') dateFormated = dateFormated.replace(' - ', '<br>');

    return dateFormated;
  }

  dateFormat(): string {
    return this.date.toLocaleDateString();
  }

  timeFormat(): string {
    return this.date.toLocaleTimeString().replace(':', 'h').split(':')[0];
  }
}
