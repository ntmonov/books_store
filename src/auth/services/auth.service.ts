import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User, updateProfile } from '@angular/fire/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  async login(email: string, password: string): Promise<void> {
    const user = await signInWithEmailAndPassword(this.auth, email, password);


  }

  async register(email: string, password: string, username: string): Promise<void> {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);

    if (user.user) {
      await updateProfile(user.user, {displayName: username});
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
