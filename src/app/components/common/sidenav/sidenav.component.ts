import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ButtonComponent, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  
  isSidebarCollapsed: boolean = false;

  SidebarVisibility = (): void => {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
