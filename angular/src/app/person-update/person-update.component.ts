import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {
  personForm: FormGroup;
  personId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {
    this.personForm = this.fb.group({
      id: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      isMan: [null, Validators.required]
    });
    this.personId = 0
  }

  ngOnInit(): void {
    this.personId = this.route.snapshot.params['id'];
    this.personService.getPersonById(this.personId).subscribe(data => {
      data.dateOfBirth = this.formatDate(data.dateOfBirth);
      this.personForm.patchValue(data);
    }, error => {
      console.error('Error fetching person:', error);
    });
  }

  onSubmit() {
      this.personService.updatePerson(this.personForm.value).subscribe(response => {
        console.log('Person updated:', response);
        this.router.navigate(['/person/getAll']);
      }, error => {
        console.error('Error updating person:', error);
      });
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }
}
