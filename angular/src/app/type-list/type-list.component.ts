import { Component, OnInit } from '@angular/core';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrl: './type-list.component.css'
})
export class TypeListComponent implements OnInit {
  types: any[] = [];
  constructor(private typeService: TypeService) { }

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes() {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
    }, error => {
      console.error('Error fetching types:', error);
    });
  }
  deleteType(id: number) {
    this.typeService.deleteType(id).subscribe(response => {
      this.loadTypes();  // Reload the list after deletion
    }, error => {
      console.error('Error deleting type:', error);
    });
  }
}
