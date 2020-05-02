import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransformerComponent } from './create-transformer.component';

describe('CreateTransformerComponent', () => {
  let component: CreateTransformerComponent;
  let fixture: ComponentFixture<CreateTransformerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransformerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
