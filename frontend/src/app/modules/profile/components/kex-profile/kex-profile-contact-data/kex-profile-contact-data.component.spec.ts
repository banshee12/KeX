import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexProfileContactDataComponent } from './kex-profile-contact-data.component';

describe('KexProfileContactDataComponent', () => {
  let component: KexProfileContactDataComponent;
  let fixture: ComponentFixture<KexProfileContactDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexProfileContactDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexProfileContactDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
