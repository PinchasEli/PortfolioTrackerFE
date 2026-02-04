import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CustomerService } from '../../../../core/services/customer.service';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-add-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './add-customer-form.component.html',
  styleUrl: './add-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCustomerFormComponent {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private logger = inject(LoggerService);
  private destroyRef = takeUntilDestroyed();

  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  onSuccess = output<void>();
  onCancel = output<void>();

  customerForm: FormGroup = this.fb.group({
    fullName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]],
    confirmPassword: ['', [
      Validators.required
    ]]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  getErrorMessage(fieldName: string): string {
    const control = this.customerForm.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      const labels: { [key: string]: string } = {
        'fullName': 'Full name',
        'email': 'Email',
        'password': 'Password',
        'confirmPassword': 'Password confirmation'
      };
      return `${labels[fieldName]} is required`;
    }

    if (control.errors['minlength']) {
      if (fieldName === 'fullName') {
        return 'Full name must be between 2 and 100 characters';
      }
      if (fieldName === 'password') {
        return 'Password must be at least 6 characters';
      }
    }

    if (control.errors['maxlength']) {
      if (fieldName === 'fullName') {
        return 'Full name must be between 2 and 100 characters';
      }
      if (fieldName === 'password') {
        return 'Password must not exceed 100 characters';
      }
    }

    if (control.errors['email']) {
      return 'Invalid email format';
    }

    if (fieldName === 'confirmPassword' && this.customerForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }

    return 'Invalid value';
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      Object.keys(this.customerForm.controls).forEach(key => {
        this.customerForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const formValue = this.customerForm.value;
    const customerData = {
      fullName: formValue.fullName,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword
    };

    this.customerService.createCustomer(customerData)
      .pipe(this.destroyRef)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.logger.log('Customer created successfully');
          this.customerForm.reset();
          this.onSuccess.emit();
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error.error?.message || 'Failed to create customer');
          this.logger.error('Error creating customer:', error);
        }
      });
  }

  cancel(): void {
    this.customerForm.reset();
    this.errorMessage.set('');
    this.onCancel.emit();
  }
}
