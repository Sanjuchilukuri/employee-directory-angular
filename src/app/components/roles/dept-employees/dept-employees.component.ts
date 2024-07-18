import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employees } from '../../../interfaces/employees';
import { EmployeeService } from '../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dept-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dept-employees.component.html',
  styleUrls: ['./dept-employees.component.scss'],
})
export class DeptEmployeesComponent implements OnInit {
  roleName: string;
  dept: string;
  employees: employees[];

  constructor(
    private _route: ActivatedRoute,
    private _employeeServices: EmployeeService,
    private _router: Router
  ) {
    this.roleName = '';
    this.dept = '';
    this.employees = [];
  }

  ngOnInit(): void {
    this.roleName = this._route.snapshot.paramMap.get('roleName') ?? '';
    this.dept = this._route.snapshot.paramMap.get('dept') ?? '';
    this._employeeServices.getAllEmployees().subscribe({
      next: (res: employees[]) =>
        (this.employees = res.filter(
          (employee) =>
            employee.role == this.roleName && employee.department === this.dept
        )),
    });
  }

  addEmployee() {
    this._router.navigateByUrl('employees/empform/add');
  }

  viewEmployee(empId: string) {
    this._router.navigateByUrl(`/employees/empform/view/${empId}`);
  }
}
