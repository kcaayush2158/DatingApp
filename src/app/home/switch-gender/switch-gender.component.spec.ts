import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchGenderComponent } from './switch-gender.component';

describe('SwitchGenderComponent', () => {
  let component: SwitchGenderComponent;
  let fixture: ComponentFixture<SwitchGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
