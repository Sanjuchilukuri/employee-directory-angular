import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleFormComponent } from './add-role-form.component';

describe('AddRoleFormComponent', () => {
  let component: AddRoleFormComponent;
  let fixture: ComponentFixture<AddRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
