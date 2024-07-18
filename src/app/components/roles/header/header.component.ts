import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router: Router = inject(Router);
  addRole() {
    this.router.navigateByUrl("/roles/form");
  }
}
