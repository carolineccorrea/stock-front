import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrdersListComponent } from './service-orders-list.component';

describe('ServiceOrdersListComponent', () => {
  let component: ServiceOrdersListComponent;
  let fixture: ComponentFixture<ServiceOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrdersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
