import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingBookComponent } from './best-selling-book.component';

describe('BestSellingBookComponent', () => {
  let component: BestSellingBookComponent;
  let fixture: ComponentFixture<BestSellingBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellingBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
