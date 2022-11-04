import { FilterBoardsPipe } from './filter-boards.pipe';

const boards = [
  {
    id: 1,
    name: 'one',
    tasks: [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
    ],
  },
  {
    id: 2,
    name: 'two',
    tasks: [
      { id: 3, name: 'three' },
      { id: 4, name: 'four' },
    ],
  },
];

const filterBoardName = 'board one';
const filterTaskName = 'task three';

describe('FilterBoardsPipe', () => {
  let filterBoardsPipe: FilterBoardsPipe;

  beforeEach(() => {
    filterBoardsPipe = new FilterBoardsPipe();
  });

  it('filters boards by name', () => {
    expect(filterBoardsPipe.transform(boards, filterBoardName)).toEqual([
      boards[0],
    ]);
  });
  it('returns original array if no filter string provided', () => {
    expect(filterBoardsPipe.transform(boards, '')).toEqual(boards);
  });
  it('filters boards by taskname', () => {
    expect(filterBoardsPipe.transform(boards, filterTaskName)).toEqual([
      boards[1],
    ]);
  });
});
