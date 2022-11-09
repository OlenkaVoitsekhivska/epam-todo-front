import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../models/board.model';

function filterThroughTasks(arry: any, string: string) {
  return arry.filter((obj: any) =>
    obj.name.toLowerCase().includes(string.toLowerCase())
  );
}

@Pipe({
  name: 'filterBoards',
})
export class FilterBoardsPipe implements PipeTransform {
  transform(boards: Board[], filter: string): Board[] {
    const copy = [...boards];
    if (filter.split(' ').length === 1 || filter === '') {
      return boards;
    }
    const [param, filterStr] = filter.split(' ');
    switch (param) {
      case 'board':
        return copy.filter((board: Board) =>
          filter
            ? board.name!.toLowerCase().includes(filterStr.toLowerCase())
            : board
        );
      case 'task':
        return copy.filter((board: Board) =>
          filter ? filterThroughTasks(board.tasks, filterStr).length > 0 : board
        );
      default:
        return copy;
    }
  }
}
