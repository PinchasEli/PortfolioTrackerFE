import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }
    
    // Clear previous error message
    this.errorMessage = '';
    this.loading = true;
    
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Login failed:', err);
        
        // Set error message from server or use default
        this.errorMessage = err?.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
