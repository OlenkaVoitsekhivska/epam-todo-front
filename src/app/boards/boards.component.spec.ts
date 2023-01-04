import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsComponent } from './boards.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { mockSingleBoard } from 'src/mockData/boards/boards';
import { Board } from '../models/board.model';
import { deleteBoard } from '../store/actions/boards.action';

@Pipe({ name: 'filterBoards' })
class MockFilterBoardsPipe implements PipeTransform {
  transform(boards: Board[], filter: string): Board[] {
    return boards.filter((board) => board.name?.includes(filter));
  }
}

@Pipe({ name: 'sort' })
class MockSortPipe implements PipeTransform {
  transform(array: any[], sort: string): any {
    return array.sort();
  }
}

describe('Boards Component', () => {
  let fixture: ComponentFixture<BoardsComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: BoardsComponent;
  const initialState = {
    boards: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BoardsComponent, MockFilterBoardsPipe, MockSortPipe],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    store = TestBed.inject(MockStore);

    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should render', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should toggle addModal state to true on openShowModal', () => {
    componentInstance.openShowModal();
    expect(componentInstance.modal.addModal).toBeTrue();
  });

  it('should toggle addModal state to false on onClose', () => {
    componentInstance.modal.addModal = true;
    componentInstance.onClose();
    expect(componentInstance.modal.addModal).toBeFalse();
  });

  it('should set active board prop to whatever is passed to onEdit method', () => {
    const board = { ...mockSingleBoard };
    componentInstance.onEdit(board);
    expect(componentInstance.activeBoard).toEqual(board);
  });

  it('should toggle editModal state to true on onEdit', () => {
    const board = { ...mockSingleBoard };
    componentInstance.onEdit(board);
    expect(componentInstance.modal.editModal).toBeTrue();
  });

  it('shouls toggle editModal state to false on onClose', () => {
    const board = { ...mockSingleBoard };
    componentInstance.onEdit(board);
    componentInstance.onClose();
    expect(componentInstance.modal.editModal).toBeFalse();
  });

  it('should dispatch deleteBoard action on delete', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const board = { ...mockSingleBoard };
    componentInstance.onDelete(board);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteBoard({ id: board.id }));
  });

  it('should set sortOrder on setSort', () => {
    const ascOrder = 'ASC';
    const selectVal = 'name';
    const expectedRes = `${ascOrder} ${selectVal}`;
    componentInstance.setSort(ascOrder, selectVal);
    expect(componentInstance.organize.sortOrder).toBe(expectedRes);
  });

  it('should set composite filter on setFilter', () => {
    componentInstance.organize.filter = 'twist';
    const filterParam = 'board';
    const expectedRes = `${filterParam} ${componentInstance.organize.filter}`;
    componentInstance.setFilter(filterParam);
    expect(componentInstance.organize.compositeFilter).toBe(expectedRes);
  });
});
