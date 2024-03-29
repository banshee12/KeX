import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexProfileSkillComponent } from './kex-profile-skill.component';

describe('KexProfileSkillComponent', () => {
  let component: KexProfileSkillComponent;
  let fixture: ComponentFixture<KexProfileSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexProfileSkillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexProfileSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
