import { StatusE } from 'src/app/models/task.model';
import { Task } from 'src/app/models/task.model';

export const mockTasks: Task[] = [
  {
    id: '1',
    name: 'task1',
    boardId: 'b-1',
    userComments: [],
    image: '',
    status: StatusE.TODO,
    createdAt: new Date('October 31, 2022 03:24:00'),
  },
  {
    id: '2',
    name: 'task2',
    boardId: 'b-1',
    userComments: [],
    image: '',
    status: StatusE.TODO,
    createdAt: new Date('October 31, 2022 03:24:00'),
  },
];

export const mockCreatedSingleTask = {
  id: '1',
  name: 'task',
  boardId: 'b-1',
  userComments: [],
  image: '',
  status: StatusE.TODO,
  createdAt: new Date('October 31, 2022 03:24:00'),
};

export const mockUpdatedTask = {
  id: '1',
  name: 'updated task',
  boardId: 'b-1',
  userComments: [],
  image: '',
  status: StatusE.IN_PROGRESS,
  createdAt: new Date('October 31, 2022 03:24:00'),
};
