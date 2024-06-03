import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishingHouseService } from '../publishing-house.service';

@Component({
  selector: 'app-publishing-house-update',
  templateUrl: './publishing-house-update.component.html',
  styleUrl: './publishing-house-update.component.css'
})
export class PublishingHouseUpdateComponent {
  publishingHouseForm: FormGroup;
  publishingHouseId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private publishingHouseService: PublishingHouseService
  ) {
    this.publishingHouseForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required]
    });
    this.publishingHouseId = 0
  }

  ngOnInit(): void {
    this.publishingHouseId = this.route.snapshot.params['id'];
    this.publishingHouseService.getPublishingHouseById(this.publishingHouseId).subscribe(data => {
      this.publishingHouseForm.patchValue(data);
    }, error => {
      console.error('Error fetching publishingHouse:', error);
    });
  }

  onSubmit() {
    this.publishingHouseService.updatePublishingHouse(this.publishingHouseForm.value).subscribe(response => {
      console.log('PublishingHouse updated:', response);
      this.router.navigate(['/publishingHouse/getAll']);
    }, error => {
      console.error('Error updating publishingHouse:', error);
    });
  }
}
