import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexNotificationComponent } from './kex-notification.component';

describe('KexNotificationComponent', () => {
  let component: KexNotificationComponent;
  let fixture: ComponentFixture<KexNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
