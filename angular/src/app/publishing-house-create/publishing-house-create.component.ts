import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishingHouseService } from '../publishing-house.service';

@Component({
  selector: 'app-publishing-house-create',
  templateUrl: './publishing-house-create.component.html',
  styleUrl: './publishing-house-create.component.css'
})
export class PublishingHouseCreateComponent {
  publishingHouseForm: FormGroup;

  constructor(private fb: FormBuilder, private publishingHouseService: PublishingHouseService) {
    this.publishingHouseForm = this.fb.group({
      name: ['', Validators.required],
      startYear: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.publishingHouseForm.valid) {
      if (this.publishingHouseForm.valid) {
        this.publishingHouseService.addPublishingHouse(this.publishingHouseForm.value).subscribe(response => {
          alert("Create with sucess");
        }, error => {
          alert(error);
        });
      }
    }
  }
}
