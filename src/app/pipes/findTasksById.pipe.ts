import { Pipe, PipeTransform } from "@angular/core";
import { TaskI } from "../models/task.model";

type StatusT = "Todo" | "In progress" | "Done";

@Pipe({
  name: "boardId",
})
export class FindTasksById implements PipeTransform {
  transform(tasks: any[], boardId: string): any[] {
    const copy = [...tasks];
    return copy.filter((task) => {
      return task.boardId === boardId;
    });
  }
}
