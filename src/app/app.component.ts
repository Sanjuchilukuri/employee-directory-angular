import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/common/sidenav/sidenav.component';
import { TopnavComponent } from './components/common/topnav/topnav.component';
import { LoginComponent } from './components/authentication/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, TopnavComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EmployeeDirectory';
}
