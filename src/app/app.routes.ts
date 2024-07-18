import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './services/authGuard/auth.guard';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeFormComponent } from './components/employee/add-employee-form/add-employee-form.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddRoleFormComponent } from './components/roles/add-role-form/add-role-form.component';
import { DeptEmployeesComponent } from './components/roles/dept-employees/dept-employees.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'employees',
        component: EmployeeComponent,
      },
      {
        path: 'employees/empform/:mode/:empId',
        component: AddEmployeeFormComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'roles/form',
        component:AddRoleFormComponent,
      },
      {
        path: 'roles/dept-employees/:roleName/:dept',
        component:DeptEmployeesComponent,
      }
    ],
  },
];
