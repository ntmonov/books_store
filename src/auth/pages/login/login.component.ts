import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
registerForm: FormGroup<LoginForm>;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: this.fb.control('', {nonNullable: true}),
      password: this.fb.control('', {nonNullable: true})
    });
    this.errorMessage = '';
  }

  async submit() {
    this.errorMessage = '';
    try {
      await this.authService.login(
        this.registerForm.value.email!,
        this.registerForm.value.password!
      );
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}
