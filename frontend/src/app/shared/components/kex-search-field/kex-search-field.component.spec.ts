import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexSearchFieldComponent } from './kex-search-field.component';

describe('KexSearchFieldComponent', () => {
  let component: KexSearchFieldComponent;
  let fixture: ComponentFixture<KexSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexSearchFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
