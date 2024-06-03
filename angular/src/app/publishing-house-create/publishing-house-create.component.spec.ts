import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingHouseCreateComponent } from './publishing-house-create.component';

describe('PublishingHouseCreateComponent', () => {
  let component: PublishingHouseCreateComponent;
  let fixture: ComponentFixture<PublishingHouseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishingHouseCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishingHouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
