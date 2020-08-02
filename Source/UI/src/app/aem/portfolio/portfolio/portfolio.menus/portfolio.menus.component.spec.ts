import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Portfolio.MenusComponent } from './portfolio.menus.component';

describe('Portfolio.MenusComponent', () => {
  let component: Portfolio.MenusComponent;
  let fixture: ComponentFixture<Portfolio.MenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Portfolio.MenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Portfolio.MenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
