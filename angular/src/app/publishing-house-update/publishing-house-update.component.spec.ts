import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingHouseUpdateComponent } from './publishing-house-update.component';

describe('PublishingHouseUpdateComponent', () => {
  let component: PublishingHouseUpdateComponent;
  let fixture: ComponentFixture<PublishingHouseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishingHouseUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishingHouseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
