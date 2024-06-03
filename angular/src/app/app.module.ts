import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    PersonListComponent,
    PersonUpdateComponent,
    TypeCreateComponent,
    TypeListComponent,
    TypeUpdateComponent,
    PublishingHouseCreateComponent,
    PublishingHouseListComponent,
    PublishingHouseUpdateComponent,
    BookCreateComponent,
    BookListComponent,
    BookUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
