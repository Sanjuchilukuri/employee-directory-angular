import { Component, OnInit } from '@angular/core';
import { Card } from '../../../interfaces/card';
import { EmployeeService } from '../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  rolesCards: Card[];
  _employeeService: EmployeeService;
  _router: Router;
  constructor(employeeService: EmployeeService, router: Router) {
    this.rolesCards = [];
    this._employeeService = employeeService;
    this._router = router;
  }

  ngOnInit(): void {
    this._employeeService.getRoleBasedEmployees().subscribe({
      next: (res) => (this.rolesCards = res),
    });
  }

  navigateToAllEmployees(roleName: string, dept:string) {
    this._router.navigateByUrl(`roles/dept-employees/${roleName}/${dept}`);
  }
}
