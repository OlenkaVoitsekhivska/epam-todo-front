import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterTasks',
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: any[], filter: string): Task[] {
    const copy = [...tasks];
    if (filter.split(' ').length === 1 || filter === '') {
      return tasks;
    } else {
      const [param, filterStr] = filter.split(' ');
      return copy.filter((task) =>
        filter
          ? task.name.toLowerCase().includes(filterStr.toLowerCase())
          : task
      );
    }
  }
}
