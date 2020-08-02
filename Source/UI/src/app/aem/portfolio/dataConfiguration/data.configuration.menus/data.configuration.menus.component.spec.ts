import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConfigurationMenusComponent } from './data.configuration.menus.component';

describe('MenusComponent', () => {
  let component: DataConfigurationMenusComponent;
  let fixture: ComponentFixture<DataConfigurationMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataConfigurationMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConfigurationMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
