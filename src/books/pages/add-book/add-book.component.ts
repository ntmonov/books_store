import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router, RouterLink } from '@angular/router';

type BookForm = {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  author: FormControl<string | null>;
  price: FormControl<number | null>;
  year_written: FormControl<string | null>;
}

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  bookForm: FormGroup<BookForm>;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      author: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null as any, [Validators.required, Validators.min(1)]),
      year_written: this.fb.control(null as any, [Validators.required])
    })
  }

  async submit() {
    try {
      await this.bookService.addBook(this.bookForm.value as Book);
      this.router.navigate(['/']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}
