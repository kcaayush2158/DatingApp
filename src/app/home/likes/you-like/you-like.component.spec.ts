import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouLikeComponent } from './you-like.component';

describe('YouLikeComponent', () => {
  let component: YouLikeComponent;
  let fixture: ComponentFixture<YouLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
