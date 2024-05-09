import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestmentComponent } from './assestment.component';

describe('AssestmentComponent', () => {
  let component: AssestmentComponent;
  let fixture: ComponentFixture<AssestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssestmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
