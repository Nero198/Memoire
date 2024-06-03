import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { PersonService } from '../person.service';
import { TypeService } from '../type.service';
import { PublishingHouseService } from '../publishing-house.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  types: any[] = [];
  persons: any[] = [];
  publishingHouses: any[] = [];

  constructor(private bookService: BookService, private personService: PersonService, private typeService: TypeService, private publishingHouseService: PublishingHouseService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.loadPublishingHouses();
    this.loadTypes();
    this.loadPersons();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    }, error => {
      console.error('Error fetching books:', error);
    });
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
  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(response => {
      this.loadBooks();  // Reload the list after deletion
    }, error => {
      console.error('Error deleting book:', error);
    });
  }
  getPublishingHouseName(id: number): string {
    const house = this.publishingHouses.find(h => h.id === id);
    return house ? house.name : 'Unknown';
  }
  getAuthor(id: number): string {
    const person = this.persons.find(h => h.id === id);
    return person ? person.lastname + person.firstname : 'Unknown';
  }
  getType(id: number): string {
    const type = this.types.find(h => h.id === id);
    return type ? type.label : 'Unknown';
  }
}
