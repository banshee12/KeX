import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexProfileExperiencesComponent } from './kex-profile-experiences.component';

describe('KexProfileExperiencesComponent', () => {
  let component: KexProfileExperiencesComponent;
  let fixture: ComponentFixture<KexProfileExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexProfileExperiencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KexProfileExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
