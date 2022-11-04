interface Comment {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  createdAt: Date | null;
  name: string | null;
  status: null | StatusE;
  boardId: string;
  image: string;
  userComments: any;
}

export enum StatusE {
  TODO = 'Todo',
  IN_PROGRESS = 'In progress',
  DONE = 'Done',
}
