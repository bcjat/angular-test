import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayAgo',
})
export class DayAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      const intervals: { [key: string]: number } = {
        day: 86400, // we can add more intervals like week, month, years and so on.
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 6) {
          let d = new Date(value);
          return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
        } else if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
        } else {
          return ' ' + 'today';
        }
      }
    }
    return value;
  }
}
