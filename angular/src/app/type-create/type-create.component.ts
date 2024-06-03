import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrl: './type-create.component.css'
})
export class TypeCreateComponent {
  typeForm: FormGroup;
  constructor(private fb: FormBuilder, private typeService: TypeService) {
    this.typeForm = this.fb.group({
      label: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.typeForm.valid) {
      if (this.typeForm.valid) {
        this.typeService.addType(this.typeForm.value).subscribe(response => {
          alert("Create with sucess");
        }, error => {
          alert(error);
        });
      }
    }
  }
}
