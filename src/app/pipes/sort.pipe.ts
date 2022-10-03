import { Pipe, PipeTransform } from '@angular/core';
import { BoardI } from '../models/board.model';
import { TaskI } from '../models/task.model';

// enum OrderE {
//   ASC = "ASC",
//   DESC = "DESC"
// }

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  // transform(boards: BoardI[], sort: string): BoardI[] {
  //   const copy = [...boards];
  //   if (sort) {
  //     const [order, parameter] = sort.split(" ");
  //     if (order === "ASC") {
  //       switch (parameter) {
  //         case "name":
  //           return copy.sort((a, b) => a.name.localeCompare(b.name));
  //         case "date":
  //           return copy.sort(
  //             (a, b) =>
  //               new Date(a.createdAt).getTime() -
  //               new Date(b.createdAt).getTime()
  //           );
  //         default:
  //           return copy.sort();
  //       }
  //     } else if (order === "DESC") {
  //       switch (parameter) {
  //         case "name":
  //           return copy.sort((a, b) => b.name.localeCompare(a.name));
  //         case "date":
  //           return copy.sort(
  //             (a, b) =>
  //               new Date(b.createdAt).getTime() -
  //               new Date(a.createdAt).getTime()
  //           );
  //         default:
  //           return copy.sort();
  //       }
  //     }
  //   } else {
  //     return boards;
  //   }
  // }
  // transform(arry: (BoardI | TaskI)[], sort: string): (BoardI | TaskI)[] {
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
          default:
            return copy.sort();
        }
      }
    } else {
      return arry;
    }
  }
}
