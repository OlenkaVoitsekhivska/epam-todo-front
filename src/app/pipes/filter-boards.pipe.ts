import { Pipe, PipeTransform } from '@angular/core';
import { BoardI } from '../models/board.model';

@Pipe({
  name: 'filterBoards',
})
export class FilterBoardsPipe implements PipeTransform {
  // transform(boards: BoardI[], filter: string): BoardI[] {
  transform(boards: any[], filter: string): any {
    console.log('this is filter', filter);
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
      return copy.filter((task) =>
        filter
          ? task.name.toLowerCase().includes(filterStr.toLowerCase())
          : task
      );
    }
  }
}
