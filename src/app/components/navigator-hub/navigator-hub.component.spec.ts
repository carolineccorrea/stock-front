import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorHubComponent } from './navigator-hub.component';

describe('NavigatorHubComponent', () => {
  let component: NavigatorHubComponent;
  let fixture: ComponentFixture<NavigatorHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigatorHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigatorHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
