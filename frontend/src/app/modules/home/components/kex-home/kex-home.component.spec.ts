import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexHomeComponent } from './kex-home.component';

describe('KexHomeComponent', () => {
  let component: KexHomeComponent;
  let fixture: ComponentFixture<KexHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
