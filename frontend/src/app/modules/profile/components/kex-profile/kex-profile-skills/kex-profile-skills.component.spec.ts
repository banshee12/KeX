import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexProfileSkillsComponent } from './kex-profile-skills.component';

describe('KexProfileSkillsComponent', () => {
  let component: KexProfileSkillsComponent;
  let fixture: ComponentFixture<KexProfileSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexProfileSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexProfileSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
