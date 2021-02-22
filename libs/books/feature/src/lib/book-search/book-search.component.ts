import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { ofType } from "@ngrx/effects";
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  subsc: Subscription;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly actionsSubj: ActionsSubject,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.subsc = this.actionsSubj.pipe(
      ofType(addToReadingList)
    ).subscribe(data => {
      const snackBarRef = this.snackBar.open('Book added.', 'Undo', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.store.dispatch(removeFromReadingList({
          item: { ...data.book, bookId: data.book.id } 
        }));
      });
   });
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
