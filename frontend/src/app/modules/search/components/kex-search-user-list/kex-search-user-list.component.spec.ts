import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexSearchUserListComponent } from './kex-search-user-list.component';

describe('KexSearchUserListComponent', () => {
  let component: KexSearchUserListComponent;
  let fixture: ComponentFixture<KexSearchUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexSearchUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexSearchUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
