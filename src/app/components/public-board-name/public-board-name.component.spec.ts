import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBoardNameComponent } from './public-board-name.component';

describe('PublicBoardNameComponent', () => {
  let component: PublicBoardNameComponent;
  let fixture: ComponentFixture<PublicBoardNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBoardNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicBoardNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
