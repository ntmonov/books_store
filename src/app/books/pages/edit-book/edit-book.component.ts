import { Component, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

type BookForm = {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  author: FormControl<string | null>;
  price: FormControl<number | null>;
  year_written: FormControl<string | null>;
  id: FormControl<string>;
}

@Component({
  selector: 'app-edit-book',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {
  bookForm: FormGroup<BookForm>;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private bookService: BookService,
              private router: Router
  ) {
     this.bookForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      author: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null as any, [Validators.required, Validators.min(1)]),
      year_written: this.fb.control(null as any, [Validators.required]),
      id: this.fb.control('', { nonNullable: true })
    });

    this.bookService.getBook(this.route.snapshot.params['id'])
      .pipe(
        take(1)
      ).subscribe(book => {
        this.bookForm.patchValue({
          title: book?.title,
          author: book?.author,
          description: book?.description,
          year_written: book?.year_written,
          price: book?.price,
          id: book?.id
        })
      })
  }

  async submit() {
    try {
      await this.bookService.updateBook(this.bookForm.value as Book);
      this.router.navigate(['/books/list']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}
