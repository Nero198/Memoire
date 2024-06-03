import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { PersonService } from '../person.service';
import { TypeService } from '../type.service';
import { PublishingHouseService } from '../publishing-house.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css'
})
export class BookCreateComponent {
  bookForm: FormGroup;
  types: any[] = [];
  persons: any[] = [];
  publishingHouses: any[] = [];

  constructor(private fb: FormBuilder, private bookservice: BookService, private personService: PersonService, private typeService: TypeService, private publishingHouseService: PublishingHouseService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: ['', Validators.required],
      publishingHouseId: ['', Validators.required],
      personId: ['', Validators.required],
      typeId: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadPublishingHouses();
    this.loadTypes();
    this.loadPersons();
  }
  loadPublishingHouses() {
    this.publishingHouseService.getPublishingHouses().subscribe(data => {
      this.publishingHouses = data;
    }, error => {
      console.error('Error fetching publishingHouses:', error);
    });
  }
  loadTypes() {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
    }, error => {
      console.error('Error fetching types:', error);
    });
  }
  loadPersons() {
    this.personService.getPersons().subscribe(data => {
      this.persons = data;
    }, error => {
      console.error('Error fetching types:', error);
    });
  }
  onSubmit() {
    if (this.bookForm.valid) {
      if (this.bookForm.valid) {
        this.bookservice.addBook(this.bookForm.value).subscribe(response => {
          alert("Create with sucess");
        }, error => {
          alert(error);
        });
      }
    }
  }
}
