import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BestSellingBookComponent } from './best-selling-book/best-selling-book.component';
import { BookManagerComponent } from './book-manager/book-manager.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BookSearchComponent } from './book-search/book-search.component';
import {MatFileUploadModule} from 'angular-material-fileupload';


@NgModule({
  declarations: [
    BookListComponent,
    BookCreateComponent,
    BookEditComponent,
    BookDetailComponent,
    BestSellingBookComponent,
    BookManagerComponent,
    BookSearchComponent,
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFileUploadModule
    ]
})
export class BookModule { }
