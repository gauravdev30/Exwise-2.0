import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRealityAssestComponent } from './create-reality-assest.component';

describe('CreateRealityAssestComponent', () => {
  let component: CreateRealityAssestComponent;
  let fixture: ComponentFixture<CreateRealityAssestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRealityAssestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRealityAssestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
