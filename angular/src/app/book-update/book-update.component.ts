import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { TypeService } from '../type.service';
import { PersonService } from '../person.service';
import { PublishingHouseService } from '../publishing-house.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent {
  bookForm: FormGroup;
  bookId: number;
  types: any[] = [];
  persons: any[] = [];
  publishingHouses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private personService: PersonService,
    private typeService: TypeService,
    private publishingHouseService: PublishingHouseService
  ) {
    this.bookForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      releaseYear: ['', Validators.required],
      publishingHouseId: ['', Validators.required],
      personId: ['', Validators.required],
      typeId: ['', Validators.required]
    });
    this.bookId = 0
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    this.bookService.getBookById(this.bookId).subscribe(data => {
      this.bookForm.patchValue(data);
    }, error => {
      console.error('Error fetching book:', error);
    });

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
    this.bookService.updateBook(this.bookForm.value).subscribe(response => {
      console.log('book updated:', response);
      this.router.navigate(['/book/getAll']);
    }, error => {
      console.error('Error updating book:', error);
    });
  }
}
