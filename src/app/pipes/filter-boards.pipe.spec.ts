import { FilterBoardsPipe } from './filter-boards.pipe';
import { mockBoards } from './../../mockData/boards/boards';

describe('FilterBoardsPipe', () => {
  let filterBoardsPipe: FilterBoardsPipe;
  const toastr = jasmine.createSpyObj('ToastrService', ['error']);
  const copyBoard = [...mockBoards];
  const filterStrBoard = 'board twist';
  const filterStrTasks = 'task updated';
  const nonexistBoardName = 'board whatever';
  const nonexistTaskName = 'task grapes';
  const boardTwist = [copyBoard[1]];
  const taskUpdateBoard = [copyBoard[0]];

  beforeEach(() => {
    filterBoardsPipe = new FilterBoardsPipe(toastr);
  });

  it('should exist', () => {
    expect(filterBoardsPipe).toBeTruthy();
  });

  it('should return an array of boards filtered by board name', () => {
    expect(filterBoardsPipe.transform(copyBoard, filterStrBoard)).toEqual(
      boardTwist
    );
  });

  it('should return an array of boards filtered by task name', () => {
    expect(filterBoardsPipe.transform(copyBoard, filterStrTasks)).toEqual(
      taskUpdateBoard
    );
  });

  it('should call toastr service if no boards were found by board name', () => {
    filterBoardsPipe.transform(copyBoard, nonexistBoardName);
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should call toastr service if no boards were found by task name', () => {
    filterBoardsPipe.transform(copyBoard, nonexistTaskName);
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should return original array of boards if filter equals to an empty str', () => {
    expect(filterBoardsPipe.transform(copyBoard, '')).toEqual(copyBoard);
  });
});
