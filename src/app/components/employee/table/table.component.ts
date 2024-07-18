import { Component, Input } from '@angular/core';
import { TableHeaders } from '../../../constants/constants';
import { CommonModule } from '@angular/common';
import { employees } from '../../../interfaces/employees';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() employees: employees[] | undefined;

  showOptionsMap: { [key: string]: boolean };
  selectAll: boolean;
  checkBoxArray: string[];
  tableHeaders: any;
  sortConfig: any;
  _employeeServices: EmployeeService;

  constructor(employeeServices: EmployeeService, private router: Router) {
    this.selectAll = false;
    this.checkBoxArray = [];
    this.tableHeaders = TableHeaders;
    this._employeeServices = employeeServices;
    this.showOptionsMap = {};
  }

  handleSort(columnKey: string): void {
    // Implement your sorting logic here
    console.log(`Sorting by ${columnKey}`);
  }

  handleSelectAll(): void {
    if (this.employees) {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.checkBoxArray = this.employees.map((emp) => emp.empId);
      } else {
        this.checkBoxArray = [];
      }
    }
  }

  handleCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const id = input.id;
    if (this.checkBoxArray.includes(id)) {
      this.checkBoxArray = this.checkBoxArray.filter((item) => item !== id);
    } else {
      this.checkBoxArray.push(id);
    }

    if (this.employees) {
      this.selectAll = this.checkBoxArray.length === this.employees.length;
    }
  }

  handleDeleteEmployees() {
    for (let empid of this.checkBoxArray) {
      this.deleteEmployee(empid);
    }
  }

  deleteEmployee(empId: string) {
    this._employeeServices.deleteEmployee(empId);
  }

  toggleOptions(empId: string) {
    if (this.showOptionsMap[empId]) {
      this.showOptionsMap[empId] = false;
    } else {
      this.showOptionsMap = {};
      this.showOptionsMap[empId] = true;
    }
  }

  viewEmployee(empId: string) {
    this.router.navigateByUrl(`/employees/empform/view/${empId}`);
  }
  
  editEmployee(empId: string) {
    this.router.navigateByUrl(`/employees/empform/edit/${empId}`);
  }
}
