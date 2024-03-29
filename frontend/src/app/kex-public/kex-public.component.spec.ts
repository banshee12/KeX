import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexPublicComponent } from './kex-public.component';

describe('KexPublicComponent', () => {
  let component: KexPublicComponent;
  let fixture: ComponentFixture<KexPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
