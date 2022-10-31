import { Pipe, PipeTransform } from '@angular/core';

function filterThroughTasks(arry: any, string: string) {
  return arry.filter((obj: any) =>
    obj.name.toLowerCase().includes(string.toLowerCase())
  );
}

@Pipe({
  name: 'filterBoards',
})
export class FilterBoardsPipe implements PipeTransform {
  transform(boards: any[], filter: string): any {
    const copy = [...boards];
    if (filter.split(' ').length === 1 || filter === '') {
      return boards;
    }
    const [param, filterStr] = filter.split(' ');
    if (param === 'board') {
      return copy.filter((board) =>
        filter
          ? board.name.toLowerCase().includes(filterStr.toLowerCase())
          : board
      );
    }
    if (param === 'task') {
      return copy.filter((board: any) => {
        if (filter) {
          if (filterThroughTasks(board.tasks, filterStr).length > 0) {
            console.log('this is the board with tasks', board);
            return board;
          } else {
            return;
          }
        }
      });
    }
  }
}
