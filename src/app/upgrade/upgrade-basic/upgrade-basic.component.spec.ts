import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeBasicComponent } from './upgrade-basic.component';

describe('UpgradeBasicComponent', () => {
  let component: UpgradeBasicComponent;
  let fixture: ComponentFixture<UpgradeBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
