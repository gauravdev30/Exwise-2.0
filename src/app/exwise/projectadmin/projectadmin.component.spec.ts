import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectadminComponent } from './projectadmin.component';

describe('ProjectadminComponent', () => {
  let component: ProjectadminComponent;
  let fixture: ComponentFixture<ProjectadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
