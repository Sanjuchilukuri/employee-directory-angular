import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../authentication.component.scss',
})
export class LoginComponent {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  toaster: ToastrService = inject(ToastrService);
  emailAddress: string = '';
  password: string = '';
  login(): void {
    this.http
      .post(
        environment.BASE_API + 'Auth/Login',
        {
          emailAddress: this.emailAddress,
          password: this.password,
        },
        {
          responseType: 'text',
        }
      )
      .subscribe({
        next: (token) => {
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/employees');
        },
        error: (error) => {
          this.toaster.info(error.error);
        },
      });
  }
}
