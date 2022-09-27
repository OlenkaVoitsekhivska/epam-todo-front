export interface TaskI{
  id: string,
  createdAt:Date|null,
  name: string|null,
  status: null|StatusE,
  boardId:string
}

enum StatusE  {
  TODO='Todo',
  IN_PROGRESS='In progress',
  DONE = 'Done'
}