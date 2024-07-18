import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Options } from '../../../interfaces/options';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormModes } from '../../../constants/constants';
import { CommonModule } from '@angular/common';
import { employee } from '../../../interfaces/employee';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.scss'],
})
export class AddEmployeeFormComponent implements OnInit {
  empId: string;
  mode: string;
  locations: Options[] = [];
  departments: Options[] = [];
  managers: Options[] = [];
  projects: Options[] = [];
  roles: Options[] = [];
  employeeForm: FormGroup;
  _toaster: ToastrService;
  _route: Router;
  viewMode: boolean;
  employee!: employee;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    router: Router,
    toaster: ToastrService,
    private _router: ActivatedRoute
  ) {
    this.empId = _router.snapshot.paramMap.get('empId') ?? '';
    this.mode = _router.snapshot.paramMap.get('mode') ?? '';
    this.viewMode = this.mode === FormModes.ViewMode;

    this.employeeForm = this.fb.group({
      image: '',
      empId: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: this.viewMode }, Validators.required],
      lastName: [{ value: '', disabled: this.viewMode }, Validators.required],
      dateofBirth: [
        { value: '', disabled: this.viewMode },
        Validators.required,
      ],
      email: [
        { value: '', disabled: this.viewMode },
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        { value: '', disabled: this.viewMode },
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
      joiningDate: [
        { value: '', disabled: this.viewMode },
        Validators.required,
      ],
      locationId: [{ value: '', disabled: this.viewMode }, Validators.required],
      departmentId: [
        { value: '', disabled: this.viewMode },
        Validators.required,
      ],
      roleId: [{ value: '', disabled: this.viewMode }, Validators.required],
      managerId: [{ value: '', disabled: this.viewMode }, Validators.required],
      projectId: [{ value: '', disabled: this.viewMode }, Validators.required],
    });

    this._route = router;
    this._toaster = toaster;
  }

  ngOnInit(): void {
    this.employeeService.getLocations().subscribe((res) => {
      this.locations = res;
    });

    this.employeeService.getDepartments().subscribe((res) => {
      this.departments = res;
    });

    this.employeeService.getManagers().subscribe((res) => {
      this.managers = res;
    });

    this.employeeService.getProjects().subscribe((res) => {
      this.projects = res;
    });

    if (this.mode == FormModes.ViewMode || this.mode == FormModes.EditMode) {
      this.employeeService.getEmployeeById(this.empId).subscribe((res) => {
        this.employee = res;
        this.populateForm();
      });
    }
  }

  populateForm(): void {
    this.employeeService
      .getRolesByDepartmentId(this.employee.departmentId)
      .subscribe((res) => {
        this.roles = res;
      });
    this.employeeForm.patchValue({
      empId: this.employee.empId,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      dateofBirth: this.employee.dateofBirth,
      email: this.employee.email,
      phoneNumber: this.employee.phoneNumber,
      joiningDate: this.employee.joiningDate,
      locationId: this.employee.locationId,
      departmentId: this.employee.departmentId,
      roleId: this.employee.roleId,
      managerId: this.employee.managerId,
      projectId: this.employee.projectId,
    });
    (document.getElementById('img') as HTMLImageElement).src =
      this.employee.image;
  }

  handleDepartmentChange(event: Event): void {
    const departmentId: number = Number(
      (event.target as HTMLInputElement).value
    );
    this.employeeService
      .getRolesByDepartmentId(departmentId)
      .subscribe((res) => {
        this.roles = res;
      });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;
        const img = document.getElementById('img') as HTMLImageElement;
        img.src = base64String;
        this.employeeForm.patchValue({
          image: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this._route.navigateByUrl('/employees');
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService
        .addEmployee(this.employeeForm.value)
        .subscribe((res) => {
          console.log('Employee added successfully', res);
        });
      this._toaster.success('Employee Added Successfully');
      this.employeeForm.reset();
    }
  }
}
