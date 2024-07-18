import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Options } from '../../../interfaces/options';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';
import { employees } from '../../../interfaces/employees';

@Component({
  selector: 'app-add-role-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-role-form.component.html',
  styleUrls: ['./add-role-form.component.scss'],
})
export class AddRoleFormComponent implements OnInit {
  roleForm: FormGroup;
  departments: Options[];
  employees: employees[];
  allEmployees: employees[]; // Added to hold all employees
  _employeeServices: EmployeeService;
  _router: Router;

  constructor(
    private fb: FormBuilder,
    employeeServices: EmployeeService,
    router: Router
  ) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
    this.departments = [];
    this._employeeServices = employeeServices;
    this._router = router;
    this.employees = [];
    this.allEmployees = []; // Initialize the array
  }

  ngOnInit(): void {
    this._employeeServices.getDepartments().subscribe({
      next: (res) => (this.departments = res),
    });
    this._employeeServices.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.allEmployees = res; // Store all employees
      },
    });
  }

  onSubmit() {
    console.log(this.roleForm.value);
  }

  cancel() {
    this._router.navigateByUrl('/roles');
  }

  showEmployees(event: Event) {
    const employeeName: string = (
      event.target as HTMLInputElement
    ).value.toLowerCase();
    console.log(employeeName);
    this.employees = this.allEmployees.filter((employee) => {
      return employee.firstName.toLowerCase().includes(employeeName);
    });
  }
}
