import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpinnerLoaderComponent } from './spinner-loader.component';

describe('SpinnerLoaderComponent', () => {
  let component: SpinnerLoaderComponent;
  let fixture: ComponentFixture<SpinnerLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
