import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.personForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      isMan: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      if (this.personForm.valid) {
        this.personService.addPerson(this.personForm.value).subscribe(response => {
          alert("Create with sucess");
        }, error => {
          alert(error);
        });
      }
    }
  }
}
