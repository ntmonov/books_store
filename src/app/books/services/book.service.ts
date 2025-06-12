import { Injectable } from '@angular/core';
import { collectionData, collection, docData, doc, addDoc, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private firestore: Firestore) { }

  async addBook(book: Book) {
    const booksRef = collection(this.firestore, 'books');
    await addDoc(booksRef, book);
  }

  listBooks(): Observable<Book[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }

  getBook(id: string) {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return docData(bookDoc, { idField: 'id' }) as Observable<Book | undefined>;
  }

  async updateBook(book: Book) {
    const bookDoc = doc(this.firestore, `books/${book.id}`);
    await updateDoc(bookDoc, book);
  }
}
