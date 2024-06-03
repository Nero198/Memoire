import { Component, OnInit } from '@angular/core';
import { PublishingHouseService } from '../publishing-house.service';

@Component({
  selector: 'app-publishing-house-list',
  templateUrl: './publishing-house-list.component.html',
  styleUrl: './publishing-house-list.component.css'
})
export class PublishingHouseListComponent implements OnInit {
  publishingHouses: any[] = [];

  constructor(private publishingHouseService: PublishingHouseService) { }

  ngOnInit(): void {
    this.loadPublishingHouses();
  }

  loadPublishingHouses() {
    this.publishingHouseService.getPublishingHouses().subscribe(data => {
      this.publishingHouses = data;
    }, error => {
      console.error('Error fetching publishingHouses:', error);
    });
  }
  deletePublishingHouse(id: number) {
    this.publishingHouseService.deletePublishingHouse(id).subscribe(response => {
      this.loadPublishingHouses();  // Reload the list after deletion
    }, error => {
      console.error('Error deleting publishingHouse:', error);
    });
  }
}
