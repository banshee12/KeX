import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KexStarRatingComponent } from './kex-star-rating.component';

describe('KexStarRatingComponent', () => {
  let component: KexStarRatingComponent;
  let fixture: ComponentFixture<KexStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KexStarRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KexStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
