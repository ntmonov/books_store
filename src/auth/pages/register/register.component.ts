import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

type RegisterForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterForm>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: this.fb.control('', {nonNullable: true}),
      password: this.fb.control('', {nonNullable: true})
    })
  }

  submit(event: Event) {
    event.preventDefault();
    this.authService.register(
      this.registerForm.value.email!,
      this.registerForm.value.password!
    )
  }
}
