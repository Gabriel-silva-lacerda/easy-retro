import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBoardNotesComponent } from './public-board-notes.component';

describe('PublicBoardNotesComponent', () => {
  let component: PublicBoardNotesComponent;
  let fixture: ComponentFixture<PublicBoardNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBoardNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicBoardNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
