import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookItemComponent } from './book-item.component';
import {NgxsModule} from '@ngxs/store';
import {BookState} from '@monorepo/books/data-access';
import {HttpClientModule} from '@angular/common/http';

describe('BookItemComponent', () => {
  let component: BookItemComponent;
  let fixture: ComponentFixture<BookItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BookItemComponent,
        HttpClientModule,
        NgxsModule.forRoot([BookState])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookItemComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
