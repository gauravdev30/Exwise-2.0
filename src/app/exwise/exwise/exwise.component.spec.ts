import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExwiseComponent } from './exwise.component';

describe('ExwiseComponent', () => {
  let component: ExwiseComponent;
  let fixture: ComponentFixture<ExwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExwiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
