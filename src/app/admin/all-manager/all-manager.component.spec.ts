import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllManagerComponent } from './all-manager.component';

describe('AllManagerComponent', () => {
  let component: AllManagerComponent;
  let fixture: ComponentFixture<AllManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
