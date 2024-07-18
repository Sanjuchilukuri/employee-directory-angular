import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Options } from '../../interfaces/options';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { employees } from '../../interfaces/employees';
import { Card } from '../../interfaces/card';
import { employee } from '../../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  constructor(private http: HttpClient) {}

  getLocations(): Observable<Options[]> {
    return this.http.get<Options[]>(`${environment.BASE_API}Location`);
  }

  getDepartments(): Observable<Options[]> {
    return this.http.get<Options[]>(`${environment.BASE_API}Department`);
  }

  getManagers(): Observable<Options[]> {
    return this.http.get<Options[]>(`${environment.BASE_API}Manager`);
  }

  getProjects(): Observable<Options[]> {
    return this.http.get<Options[]>(`${environment.BASE_API}Project`);
  }

  getRolesByDepartmentId(departmentId: number): Observable<Options[]> {
    return this.http.get<Options[]>(
      `${environment.BASE_API}Roles/${departmentId}`
    );
  }

  addEmployee(newEmployee: any) {
    return this.http.post(`${environment.BASE_API}Employee`, newEmployee);
  }

  getAllEmployees(): Observable<employees[]> {
    return this.http.get<employees[]>(`${environment.BASE_API}Employee`);
  }

  deleteEmployee(empId: string) {
    const endpoint = `${environment.BASE_API}Employee/${empId}`;
    this.http.delete(endpoint);
    
  }

  getEmployeeById(empId:string):Observable<employee>{
    return this.http.get<employee>(`${environment.BASE_API}Employee/${empId}`);
  }

  getRoleBasedEmployees(): Observable<Card[]>{
    return this.http.get<Card[]>(`${environment.BASE_API}Roles`);
  }

  getFilteredEmployees(filters: any): Observable<employees[]> {
    let params = new HttpParams();

    if (filters.Locations) {
      params = params.append('Location', filters.Locations);
    }
    if (filters.Departments) {
      params = params.append('Department', filters.Departments);
    }
    if (filters.alphabet) {
      params = params.append('alphabet', filters.alphabet);
    }
    if (filters.status) {
      params = params.append('status', filters.status);
    }

    return this.http.get<employees[]>(
      `${environment.BASE_API}Employee/filter`,
      {
        params: params,
      }
    );
  }
}
