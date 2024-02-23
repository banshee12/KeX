import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexToolbarComponent } from './kex-toolbar.component';

describe('KexToolbarComponent', () => {
  let component: KexToolbarComponent;
  let fixture: ComponentFixture<KexToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
