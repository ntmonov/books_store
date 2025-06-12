import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

type RegisterForm = {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirm_password: FormControl<string>;
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
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: this.fb.control('', { nonNullable: true }),
      username: this.fb.control('', { nonNullable: true }),
      password: this.fb.control('', { nonNullable: true }),
      confirm_password: this.fb.control('', { nonNullable: true})
    },{
      validators: [this.confirmPassValidator()]
    });
    this.errorMessage = '';
  }

  async submit() {
    this.errorMessage = '';
    try {
      await this.authService.register(
        this.registerForm.value.email!,
        this.registerForm.value.password!,
        this.registerForm.value.username!
      );

      this.router.navigate(['/']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }

  confirmPassValidator(): ValidationErrors | null {
    return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { passwordsMismatch: true };
  };
  };
}
