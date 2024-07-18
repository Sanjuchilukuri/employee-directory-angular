import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: '../authentication.component.scss',
})
export class RegisterComponent {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  toaster: ToastrService = inject(ToastrService);
  user = {
    name: '',
    emailAddress: '',
    password: '',
  };
  register = (): void => {
    this.http
      .post(environment.BASE_API + 'Auth/register', this.user)
      .subscribe({
        next: (user) => {
          this.toaster.info('Registered Successfully');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          this.toaster.info(error.error);
        },
      });
  };
}
