import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterTasks',
})
export class FilterTasksPipe implements PipeTransform {
  constructor(private toastr: ToastrService) {}
  noTasksToast() {
    this.toastr.error('No results');
  }
  transform(tasks: any[], filter: string): Task[] {
    const copy = [...tasks];
    if (filter.split(' ').length === 1 || filter === '') {
      return tasks;
    } else {
      const [param, filterStr] = filter.split(' ');
      const filtered = copy.filter((task) =>
        task.name.toLowerCase().includes(filterStr.toLowerCase())
      );
      if (!filtered.length) {
        this.noTasksToast();
      }
      return filtered;
    }
  }
}
