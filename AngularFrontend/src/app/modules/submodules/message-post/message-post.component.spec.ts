import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePostComponent } from './message-post.component';

describe('MessagePostComponent', () => {
  let component: MessagePostComponent;
  let fixture: ComponentFixture<MessagePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
