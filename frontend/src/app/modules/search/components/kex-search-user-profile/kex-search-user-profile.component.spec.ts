import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexSearchUserProfileComponent } from './kex-search-user-profile.component';

describe('KexSearchUserProfileComponent', () => {
  let component: KexSearchUserProfileComponent;
  let fixture: ComponentFixture<KexSearchUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexSearchUserProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexSearchUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
