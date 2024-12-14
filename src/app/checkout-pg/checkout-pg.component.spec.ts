import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPgComponent } from './checkout-pg.component';

describe('CheckoutPgComponent', () => {
  let component: CheckoutPgComponent;
  let fixture: ComponentFixture<CheckoutPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
