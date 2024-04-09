import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveylistbyclientComponent } from './surveylistbyclient.component';

describe('SurveylistbyclientComponent', () => {
  let component: SurveylistbyclientComponent;
  let fixture: ComponentFixture<SurveylistbyclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveylistbyclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveylistbyclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
