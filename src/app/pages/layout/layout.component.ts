import { Component } from '@angular/core';
import { SidenavComponent } from '../../components/common/sidenav/sidenav.component';
import { TopnavComponent } from '../../components/common/topnav/topnav.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent, TopnavComponent, RouterOutlet, LoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
