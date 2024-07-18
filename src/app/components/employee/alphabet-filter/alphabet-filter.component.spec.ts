import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetFilterComponent } from './alphabet-filter.component';

describe('AlphabetFilterComponent', () => {
  let component: AlphabetFilterComponent;
  let fixture: ComponentFixture<AlphabetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
