import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexModalConfirmationComponent } from './kex-modal-confirmation.component';

describe('KexModalConfirmationComponent', () => {
  let component: KexModalConfirmationComponent;
  let fixture: ComponentFixture<KexModalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexModalConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexModalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
