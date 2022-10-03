import { Pipe, PipeTransform } from "@angular/core";
import { TaskI } from "../models/task.model";

type StatusT = "Todo" | "In progress" | "Done";

@Pipe({
  name: "status",
})
export class TaskStatusPipe implements PipeTransform {
  transform(tasks: TaskI[], status: StatusT): TaskI[] {
    const copy = [...tasks];
    return copy.filter((task) => {
      return task.status === status;
    });
  }
}
