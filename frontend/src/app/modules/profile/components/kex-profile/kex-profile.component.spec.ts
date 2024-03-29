import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexProfileComponent } from './kex-profile.component';

describe('KexProfileComponent', () => {
  let component: KexProfileComponent;
  let fixture: ComponentFixture<KexProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
