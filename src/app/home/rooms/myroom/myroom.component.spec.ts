import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyroomComponent } from './myroom.component';

describe('MyroomComponent', () => {
  let component: MyroomComponent;
  let fixture: ComponentFixture<MyroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
