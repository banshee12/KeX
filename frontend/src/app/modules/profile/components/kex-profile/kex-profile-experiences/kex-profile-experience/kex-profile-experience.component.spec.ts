import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexProfileExperienceComponent } from './kex-profile-experience.component';

describe('KexProfileExperienceComponent', () => {
  let component: KexProfileExperienceComponent;
  let fixture: ComponentFixture<KexProfileExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexProfileExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexProfileExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
