import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import {PageEvent} from '@angular/material/paginator';
import {Pagination} from '@monorepo/books/data-access';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit update pagination, when clicking update paginator', () => {
    jest.spyOn(component.updatePaginator, 'emit');

    const event: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 10
    };

    const paginator: Pagination = {
      startIndex: event.pageIndex,
      maxResults: event.pageSize
    }

    component.onUpdatePaginator(event);

    expect(component.updatePaginator.emit).toBeCalledWith(paginator)
  })
});
