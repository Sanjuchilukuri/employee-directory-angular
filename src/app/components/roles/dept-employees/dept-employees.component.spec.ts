import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptEmployeesComponent } from './dept-employees.component';

describe('DeptEmployeesComponent', () => {
  let component: DeptEmployeesComponent;
  let fixture: ComponentFixture<DeptEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeptEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
