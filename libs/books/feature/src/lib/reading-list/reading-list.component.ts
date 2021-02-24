import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, addToReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ofType } from "@ngrx/effects";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBar.open('Book removed.', 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({
        book: { ...item, id: item.bookId }
      }));
    });
  }
}
