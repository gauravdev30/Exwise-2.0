import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestRealityComponent } from './assest-reality.component';

describe('AssestRealityComponent', () => {
  let component: AssestRealityComponent;
  let fixture: ComponentFixture<AssestRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssestRealityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssestRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
