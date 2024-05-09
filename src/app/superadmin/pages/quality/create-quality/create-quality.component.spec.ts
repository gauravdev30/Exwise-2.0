import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityComponent } from './create-quality.component';

describe('CreateQualityComponent', () => {
  let component: CreateQualityComponent;
  let fixture: ComponentFixture<CreateQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
