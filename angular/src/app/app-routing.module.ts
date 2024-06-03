import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonUpdateComponent } from './person-update/person-update.component';
import { TypeCreateComponent } from './type-create/type-create.component';
import { TypeListComponent } from './type-list/type-list.component';
import { TypeUpdateComponent } from './type-update/type-update.component';
import { PublishingHouseCreateComponent } from './publishing-house-create/publishing-house-create.component';
import { PublishingHouseListComponent } from './publishing-house-list/publishing-house-list.component';
import { PublishingHouseUpdateComponent } from './publishing-house-update/publishing-house-update.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookUpdateComponent } from './book-update/book-update.component';

const routes: Routes = [
  { path: 'person/create', component: CreateComponent },
  { path: 'person/getAll', component: PersonListComponent },
  { path: 'person/update/:id', component: PersonUpdateComponent },
  { path: 'type/create', component: TypeCreateComponent },
  { path: 'type/getAll', component: TypeListComponent },
  { path: 'type/update/:id', component: TypeUpdateComponent },
  { path: 'publishingHouse/create', component: PublishingHouseCreateComponent },
  { path: 'publishingHouse/getAll', component: PublishingHouseListComponent },
  { path: 'publishingHouse/update/:id', component: PublishingHouseUpdateComponent },
  { path: 'book/create', component: BookCreateComponent },
  { path: 'book/getAll', component: BookListComponent },
  { path: 'book/update/:id', component: BookUpdateComponent },
  { path: '', redirectTo: '/person/getAll', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
