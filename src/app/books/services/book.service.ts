import { Injectable } from '@angular/core';
import { collectionData, collection, docData, doc, addDoc, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: Firestore) { }

  async addBook(book: Book) {
    const booksRef = collection(this.firestore, 'books');
    await addDoc(booksRef, book);
  }
}
