import { Pipe, PipeTransform } from "@angular/core";
import { TaskI } from "../models/task.model";

type StatusT = "Todo" | "In progress" | "Done";

@Pipe({
  name: "userId",
})
export class FindBoardsById implements PipeTransform {
  transform(boards: any[], userId: string): any[] {
    const copy = [...boards];
    return copy.filter((board) => {
      return board.userId === userId;
    });
  }
}
