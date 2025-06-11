import { Injectable, signal, Signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<UserCredential | null>(null);

  constructor(private auth: Auth) { }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string): Promise<void> {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    this.user.set(user);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
