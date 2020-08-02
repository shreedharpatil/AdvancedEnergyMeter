import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Data.ConfigurationComponent } from './data.configuration.component';

describe('Data.ConfigurationComponent', () => {
  let component: Data.ConfigurationComponent;
  let fixture: ComponentFixture<Data.ConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Data.ConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Data.ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
