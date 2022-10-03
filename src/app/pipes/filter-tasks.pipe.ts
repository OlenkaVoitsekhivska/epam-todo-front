import { Pipe, PipeTransform } from '@angular/core';
import { TaskI } from '../models/task.model';

@Pipe({
  name: 'filterTasks',
})
export class FilterTasksPipe implements PipeTransform {
  // transform(tasks: TaskI[], filter: string): TaskI[] {
  transform(tasks: any[], filter: string): TaskI[] {
    const copy = [...tasks];
    if (filter.split(' ').length === 1 || filter === '') {
      return tasks;
    } else {
      const [param, filterStr] = filter.split(' ');
      // if (param === 'task') {
      return copy.filter((task) =>
        filter
          ? task.name.toLowerCase().includes(filterStr.toLowerCase())
          : task
      );
      // }
    }
  }
}
