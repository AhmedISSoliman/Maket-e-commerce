import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatcsComponent } from './contatcs.component';

describe('ContatcsComponent', () => {
  let component: ContatcsComponent;
  let fixture: ComponentFixture<ContatcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatcsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
