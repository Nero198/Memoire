import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons() {
    this.personService.getPersons().subscribe(data => {
      this.persons = data;
    }, error => {
      console.error('Error fetching persons:', error);
    });
  }
  deletePerson(id: number) {
      this.personService.deletePerson(id).subscribe(response => {
        this.loadPersons();  // Reload the list after deletion
      }, error => {
        console.error('Error deleting person:', error);
      });
  }
}
