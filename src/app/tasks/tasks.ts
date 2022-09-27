
enum StatusE  {
  TODO='Todo',
  IN_PROGRESS='In progress',
  DONE = 'Done'
}

export const tasks = [
  {
    id:0,
    createdAt: new Date(),
    name:'write tasks component',
    status:StatusE.TODO,
    boardId:1
  },
  {
    id:1,
    createdAt: new Date(),
    name:'write custom directive',
    status:StatusE.IN_PROGRESS,
    boardId:1
  },
  {
    id:2,
    createdAt: new Date(),
    name:'implement lazy loading',
    status:StatusE.DONE,
    boardId:2
  }
]