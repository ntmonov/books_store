import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {
  constructor(private authService: AuthService,
              private router: Router
  ) {}

  getUser(): Observable<User | null> {
    return this.authService.user$;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/'])
    } catch (err) {

    }
  }
}
