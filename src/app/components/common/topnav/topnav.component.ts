import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {

  router: Router = inject(Router);
  displayLogout: boolean = false; 
  toggleLogout = (): void => {
    this.displayLogout = !this.displayLogout;
  }
  logout = () => {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
