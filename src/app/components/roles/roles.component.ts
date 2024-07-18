import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CardsComponent } from './cards/cards.component';
import { DropDownComponent } from '../common/drop-down/drop-down.component';
import { Options } from '../../interfaces/options';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [HeaderComponent, CardsComponent, DropDownComponent, CardsComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  filters: { [key: string]: Options[] };
  departments: Options[];

  private _employeeServices: EmployeeService;

  constructor(employeeServices: EmployeeService) {
    console.log('parent constructoe');
    this._employeeServices = employeeServices;
    this.filters = {};
    this.departments = [];
  }

  async ngOnInit(): Promise<void> {
    console.log('parent oninit');
    await this._employeeServices.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        this.filters = {
          ...this.filters,
          Departments: this.departments,
        };
      },
    });
  }
}
