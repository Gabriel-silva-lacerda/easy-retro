import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreListComponent } from './more-list.component';

describe('MoreListComponent', () => {
  let component: MoreListComponent;
  let fixture: ComponentFixture<MoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
