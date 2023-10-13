import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BooksListComponent} from './books-list.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {BookItemComponent} from './components/book-item/book-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {BookState, Pagination} from '@monorepo/books/data-access';
import {HttpClientModule} from '@angular/common/http';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BooksListComponent,
        PaginationComponent,
        BookItemComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([BookState])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch update paginator action when clicking update paginator', () => {
    const spyMock = jest.spyOn(component.updatePaginator, 'emit');

    const pagination: Pagination = {
      startIndex: 0,
      maxResults: 10
    };

    component.onUpdatePaginator(pagination);

    expect(spyMock).toBeCalledWith(pagination);
  });
});
