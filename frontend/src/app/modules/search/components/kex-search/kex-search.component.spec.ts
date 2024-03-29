import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexSearchComponent } from './kex-search.component';

describe('KexSearchComponent', () => {
  let component: KexSearchComponent;
  let fixture: ComponentFixture<KexSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
