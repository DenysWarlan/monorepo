import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookSearchComponent} from './book-search.component';
import {NgxsModule, Store} from '@ngxs/store';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookState, Pagination, SearchBook} from '@monorepo/books/data-access';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BookSearchComponent,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([BookState])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookSearchComponent);

    store = TestBed.inject(Store);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset search input when clicking on reset', () => {
    component.search.setValue('test');

    component.onReset();

    expect(component.search.value).toEqual('')
  });

  it('should dispatch search action when clicking on search', () => {
    const spyMock = jest.spyOn(store, 'dispatch');

    const searchQuery = 'test'

    const pagination: Pagination = {
      query: searchQuery
    }

    component.search.setValue(searchQuery);

    component.onSearch();

    expect(spyMock).toBeCalledWith(new SearchBook(pagination));
  });
});
