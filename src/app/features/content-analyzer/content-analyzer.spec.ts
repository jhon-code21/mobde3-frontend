import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAnalyzer } from './content-analyzer';

describe('ContentAnalyzer', () => {
  let component: ContentAnalyzer;
  let fixture: ComponentFixture<ContentAnalyzer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentAnalyzer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAnalyzer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
