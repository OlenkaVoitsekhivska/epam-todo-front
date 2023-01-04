import { Board } from 'src/app/models/board.model';
import { StatusE } from 'src/app/models/task.model';

export const mockBoards: Board[] = [
  {
    id: '1',
    name: 'board',
    description: 'baord description',
    tasks: [],
    createdAt: new Date('October 31, 2022 03:24:00'),
    userId: 'u-1',
    uiPreferences: {
      col1: '',
      col2: '',
      col3: '',
    },
  },
  {
    id: '2',
    name: 'board with a twist',
    description: 'baord description',
    tasks: [],
    createdAt: new Date('October 30, 2022 03:24:00'),
    userId: 'u-1',
    uiPreferences: {
      col1: '',
      col2: '',
      col3: '',
    },
  },
];

export const mockSingleBoard: Board = {
  id: '1',
  name: 'board',
  description: 'baord description',
  tasks: [],
  createdAt: new Date('October 31, 2022 03:24:00'),
  userId: 'u-1',
  uiPreferences: {
    col1: '',
    col2: '',
    col3: '',
  },
};

export const mockSingleUpdatedBoard: Board = {
  id: '1',
  name: 'updated name',
  description: 'baord description',
  tasks: [],
  createdAt: new Date('October 31, 2022 03:24:00'),
  userId: 'u-1',
  uiPreferences: {
    col1: '',
    col2: '',
    col3: '',
  },
};

export const mockSingleUpdatedColorBoard: Board = {
  id: '1',
  name: 'name',
  description: 'baord description',
  tasks: [],
  createdAt: new Date('October 31, 2022 03:24:00'),
  userId: 'u-1',
  uiPreferences: {
    col1: '#32a852',
    col2: '',
    col3: '',
  },
};
