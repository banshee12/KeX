import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexSearchUserListUserComponent } from './kex-search-user-list-user.component';

describe('KexSearchUserListUserComponent', () => {
  let component: KexSearchUserListUserComponent;
  let fixture: ComponentFixture<KexSearchUserListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexSearchUserListUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexSearchUserListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
