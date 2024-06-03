import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
  styleUrl: './type-update.component.css'
})
export class TypeUpdateComponent implements OnInit {
  typeForm: FormGroup;
  typeId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeService: TypeService
  ) {
    this.typeForm = this.fb.group({
      id: ['', Validators.required],
      label: ['', Validators.required]
    });
    this.typeId = 0
  }

  ngOnInit(): void {
    this.typeId = this.route.snapshot.params['id'];
    this.typeService.getTypeById(this.typeId).subscribe(data => {
      this.typeForm.patchValue(data);
    }, error => {
      console.error('Error fetching type:', error);
    });
  }

  onSubmit() {
    this.typeService.updateType(this.typeForm.value).subscribe(response => {
      console.log('Type updated:', response);
      this.router.navigate(['/type/getAll']);
    }, error => {
      console.error('Error updating type:', error);
    });
  }
}
