import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Make sure to import CommonModule and ReactiveFormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Include the CommonModule and ReactiveFormsModule
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the signup form
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[A-Z]).*') // Regex for at least one uppercase letter
        ]
      ],      repassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  get f() {
    return this.signupForm.controls;
  }

  // Custom validator for matching password and repassword
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const repassword = group.get('repassword')?.value;
    return password === repassword ? null : { passwordMismatch: true };
  }

  signup(): void {
    if (this.signupForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    const { name, email, password, repassword } = this.signupForm.value;
  
    this.authService.signUp(name, email, password, repassword).subscribe(
      (response: { token: string }) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.isLoading = false;
  
        // Assuming the backend sends an error message in 'error.message' or similar
        this.errorMessage = error?.error?.message || 'Something went wrong. Please try again.';
      }
    );
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
