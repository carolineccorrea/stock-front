import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardServiceOrderComponent } from './dashboard-service-order.component';

describe('DashboardServiceOrderComponent', () => {
  let component: DashboardServiceOrderComponent;
  let fixture: ComponentFixture<DashboardServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardServiceOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
