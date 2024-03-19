import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBoardModalComponent } from './public-board-modal.component';

describe('PublicBoardModalComponent', () => {
  let component: PublicBoardModalComponent;
  let fixture: ComponentFixture<PublicBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBoardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
