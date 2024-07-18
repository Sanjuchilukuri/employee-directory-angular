import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AlphabetFilterComponent } from './alphabet-filter/alphabet-filter.component';
import { DropDownComponent } from '../common/drop-down/drop-down.component';
import { EmployeeService } from '../../services/employee/employee.service';
import { Options } from '../../interfaces/options';
import { status } from '../../constants/constants';
import { TableComponent } from './table/table.component';
import { employees } from '../../interfaces/employees';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    HeaderComponent,
    AlphabetFilterComponent,
    DropDownComponent,
    TableComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  allfilters = {
    alphabet: '',
    status: '',
    Locations: '',
    Departments: '',
  };

  filters: { [key: string]: Options[] };

  locations: Options[];

  departments: Options[];

  employees: employees[];

  private _employeeServices!: EmployeeService;

  constructor(employeeServices: EmployeeService) {
    this._employeeServices = employeeServices;

    this.filters = {
      status: status,
    };

    this.locations = [];

    this.departments = [];

    this.employees = [];
  }

  ngOnInit(): void {
    this._employeeServices.getLocations().subscribe({
      next: (res) => {
        this.locations = res;
        this.filters['Locations'] = res;
      },
    });
    this._employeeServices.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        this.filters['Departments'] = res;
      },
    });
    this._employeeServices.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
      },
    });
  }

  updateAllFilters($event: any) {
    this.allfilters = $event;
    this._employeeServices.getFilteredEmployees(this.allfilters).subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (error) => {
        this.employees = [];
      }
    });
  }

  
}
