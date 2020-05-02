import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeederComponent } from './create-feeder.component';

describe('CreateFeederComponent', () => {
  let component: CreateFeederComponent;
  let fixture: ComponentFixture<CreateFeederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFeederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
