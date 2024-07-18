import { Component, Input, inject } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { Router } from '@angular/router';
import { employees } from '../../../interfaces/employees';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() employees: employees[] | undefined;
  
  router: Router = inject(Router);
  exportData = (): void => {
    new AngularCsv(this.employees, "Employees")
  }

  addEmployee = (): void => {
    this.router.navigateByUrl("employees/empform/add/0")
  }

 
}
