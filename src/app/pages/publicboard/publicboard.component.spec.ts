import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicboardComponent } from './publicboard.component';

describe('PublicboardComponent', () => {
  let component: PublicboardComponent;
  let fixture: ComponentFixture<PublicboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
