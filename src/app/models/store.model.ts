import { Board } from './board.model';
import { loggedUser } from './loggedUser.model';

export interface Store {
  loggedUser: loggedUser;
  board: Board;
  boards: Board[];
  tasks: Task[];
}
