import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-books',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss'
})
export class ListBooksComponent {
  books$: Observable<Book[]>;
  constructor(public bookService: BookService) {
    this.books$ = this.bookService.listBooks();
  }
}
