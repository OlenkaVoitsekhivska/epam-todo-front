import { TaskStatusPipe } from './taskStatus.pipe';

const tasks = [
  { id: '1', name: 'one', status: 'Todo' },
  { id: '2', name: 'two', status: 'In progress' },
  { id: '3', name: 'three', status: 'Done' },
  { id: '4', name: 'one', status: 'Todo' },
];

describe('FilterBoardsPipe', () => {
  let statusPipe: TaskStatusPipe;
  let copy: any;

  beforeEach(() => {
    statusPipe = new TaskStatusPipe();
    copy = [...tasks];
  });

  it('sort asc name', () => {
    expect(statusPipe.transform(copy, 'Todo')).toEqual([copy[0], copy[3]]);
  });
  it('sort desc name', () => {
    expect(statusPipe.transform(copy, 'In progress')).toEqual([copy[1]]);
  });
  it('sort asc date', () => {
    expect(statusPipe.transform(copy, 'Done')).toEqual([copy[2]]);
  });
});
