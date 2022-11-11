import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private toastr: ToastrService) {}

  noBoardsToast() {
    this.toastr.error('No results', 'Error');
  }

  transform(boards: Board[], filter: string): Board[] {
    const copy = [...boards];
    if (filter.split(' ').length === 1 || filter === '') {
      return boards;
    }
    const [param, filterStr] = filter.split(' ');
    switch (param) {
      case 'board':
        const filteredName = copy.filter((board: Board) =>
          board.name!.toLowerCase().includes(filterStr.toLowerCase())
        );
        if (!filteredName.length) {
          this.noBoardsToast();
        }
        return filteredName;
      case 'task':
        const filteredTask = copy.filter(
          (board: Board) =>
            filterThroughTasks(board.tasks, filterStr).length > 0
        );
        if (!filteredTask.length) {
          this.noBoardsToast();
        }
        return filteredTask;
      default:
        return copy;
    }
  }
}
