import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  // For reactive forms
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Specify the component is standalone
  imports: [CommonModule, ReactiveFormsModule],  // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;  // Define the reactive form
  isLoading = false;  // Flag for loading state
  errorMessage: string = '';  // Error message to show on login failure

  constructor(
    private authService: AuthService,  // Inject AuthService to handle authentication
    private router: Router,            // Inject Router to navigate after successful login
    private fb: FormBuilder            // Inject FormBuilder to create a reactive form
  ) {
    // Initialize the form with email and password fields and validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with required and email validation
      password: ['', [Validators.required, Validators.minLength(6)]]  // Password field with required and min length validation
    });
  }

  // Getter to easily access form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  // Login method called on form submission
  login(): void {
    if (this.loginForm.invalid) {
      return;  // If form is invalid, prevent the login action
    }

    this.isLoading = true;  // Set loading flag to true while waiting for login response
    const { email, password } = this.loginForm.value;

    // Call the signIn method from AuthService to authenticate the user
    this.authService.signIn(email, password).subscribe(
      response => {
        localStorage.setItem('token', response.token);  // Store the token in localStorage
        this.router.navigate(['/products']);  // Redirect to the home page
        console.log(response.token)
      },
      error => {
        this.isLoading = false;  // Hide loading flag
        this.errorMessage = 'Login failed. Please check your credentials and try again.';  // Show error message
      }
    );
  }
  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
