import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestQualityComponent } from './assest-quality.component';

describe('AssestQualityComponent', () => {
  let component: AssestQualityComponent;
  let fixture: ComponentFixture<AssestQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssestQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssestQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
