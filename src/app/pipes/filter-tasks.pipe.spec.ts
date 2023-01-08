import { FilterTasksPipe } from './filter-tasks.pipe';
import { mockTasks } from 'src/mockData/tasks/tasks';

describe('FilterTaskssPipe', () => {
  let filterTasksPipe: FilterTasksPipe;
  const toastr = jasmine.createSpyObj('ToastrService', ['error']);
  const copyTasks = [...mockTasks];
  const filterStr = 'task 1';
  const nonexistTaskName = 'task grapes';
  const task1 = [copyTasks[0]];

  beforeEach(() => {
    filterTasksPipe = new FilterTasksPipe(toastr);
  });

  it('should exist', () => {
    expect(filterTasksPipe).toBeTruthy();
  });

  it('should return an array of tasks filtered by name', () => {
    expect(filterTasksPipe.transform(copyTasks, filterStr)).toEqual(task1);
  });

  it('should call toastr service if no tasks were found by name', () => {
    filterTasksPipe.transform(copyTasks, nonexistTaskName);
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should return original array of tasks if filter equals to an empty str', () => {
    expect(filterTasksPipe.transform(copyTasks, '')).toEqual(copyTasks);
  });
});
