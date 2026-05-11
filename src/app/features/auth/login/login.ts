import { Component, inject, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  private toastr = inject(ToastrService);

  private cdr = inject(ChangeDetectorRef);

  loading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toastr.info('Login Successful');
        this.router.navigate(['/dashboard']);
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
        this.toastr.error(error?.error?.message || 'Failed to login');
        this.cdr.detectChanges();
      },
    });
  }
}
