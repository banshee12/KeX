import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexButtonComponent } from './kex-button.component';

describe('KexButtonComponent', () => {
  let component: KexButtonComponent;
  let fixture: ComponentFixture<KexButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
