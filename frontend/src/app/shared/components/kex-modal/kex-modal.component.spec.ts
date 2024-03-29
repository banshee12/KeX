import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexModalComponent } from './kex-modal.component';

describe('KexModalComponent', () => {
  let component: KexModalComponent;
  let fixture: ComponentFixture<KexModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
