import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Component({
  selector: 'app-list-books',
  imports: [CommonModule],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss'
})
export class ListBooksComponent {
  books$: Observable<Book[]>;
  constructor(public bookService: BookService) {
    this.books$ = this.bookService.listBooks();
  }
}
