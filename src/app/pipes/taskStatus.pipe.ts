import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

type StatusT = 'Todo' | 'In progress' | 'Done';

@Pipe({
  name: 'status',
})
export class TaskStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: StatusT): Task[] {
    const copy = [...tasks];
    return copy.filter((task) => {
      return task.status === status;
    });
  }
}
