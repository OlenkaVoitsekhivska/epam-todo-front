import { SortPipe } from './sort.pipe';

const boards = [
  {
    id: '1',
    name: 'a',
    createdAt: new Date('October 17, 2022 03:24:00'),
    status: 'Todo',
    tasks: [
      { id: '1', name: 'one' },
      { id: '2', name: 'two' },
      { id: '3', name: 'three' },
    ],
  },
  {
    id: '3',
    name: 'h',
    status: 'Done',
    createdAt: new Date('October 14, 2022 03:24:00'),
    tasks: [
      { id: '4', name: 'four' },
      { id: '5', name: 'five' },
    ],
  },
  {
    id: '2',
    name: 'z',
    status: 'In progress',
    createdAt: new Date('October 11, 2022 03:24:00'),
    tasks: [{ id: '3', name: 'three' }],
  },
];

const sortingParams = {
  an: 'ASC name',
  ad: 'ASC date',
  at: 'ASC tasks',
  dn: 'DESC name',
  dd: 'DESC date',
  dt: 'DESC tasks',
};

describe('FilterBoardsPipe', () => {
  let sortPipe: SortPipe;
  let copy: any;

  beforeEach(() => {
    sortPipe = new SortPipe();
    copy = [...boards];
  });

  it('sort asc name', () => {
    expect(sortPipe.transform(copy, sortingParams.an)).toEqual(copy);
  });
  it('sort desc name', () => {
    expect(sortPipe.transform(copy, sortingParams.dn)).toEqual(copy.reverse());
  });
  it('sort asc date', () => {
    expect(sortPipe.transform(copy, sortingParams.ad)).toEqual(copy.reverse());
  });
  it('sort desc date', () => {
    expect(sortPipe.transform(copy, sortingParams.dd)).toEqual(copy);
  });
  it('sort asc task number', () => {
    expect(sortPipe.transform(copy, sortingParams.at)).toEqual(copy.reverse());
  });
  it('sort desc task number', () => {
    expect(sortPipe.transform(copy, sortingParams.dt)).toEqual(copy);
  });
});
