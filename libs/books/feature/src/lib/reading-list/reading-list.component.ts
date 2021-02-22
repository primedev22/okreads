import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { getReadingList, addToReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ofType } from "@ngrx/effects";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit, OnDestroy {
  readingList$ = this.store.select(getReadingList);
  subsc: Subscription;

  constructor(
    private readonly store: Store,
    private readonly actionsSubj: ActionsSubject,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subsc = this.actionsSubj.pipe(
      ofType(removeFromReadingList)
    ).subscribe(data => {
      const snackBarRef = this.snackBar.open('Book removed.', 'Undo', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.store.dispatch(addToReadingList({
          book: { ...data.item, id: data.item.bookId }
        }));
      });
   });
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
