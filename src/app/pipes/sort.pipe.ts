import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(arry: any[], sort: string): any {
    const copy = [...arry];
    if (sort) {
      const [order, parameter] = sort.split(' ');

      if (order === 'ASC') {
        switch (parameter) {
          case 'name':
            return copy.sort((a, b) => a.name.localeCompare(b.name));
          case 'date':
            return copy.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
          case 'tasks':
            return copy.sort((a, b) => a.tasks.length - b.tasks.length);
          default:
            return copy.sort();
        }
      } else if (order === 'DESC') {
        switch (parameter) {
          case 'name':
            return copy.sort((a, b) => b.name.localeCompare(a.name));
          case 'date':
            return copy.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          case 'tasks':
            return copy.sort((a, b) => b.tasks.length - a.tasks.length);
          default:
            return copy.sort();
        }
      }
    } else {
      return arry;
    }
  }
}
