import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {BookCreateComponent} from './book-create/book-create.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BestSellingBookComponent} from './best-selling-book/best-selling-book.component';


const routes: Routes = [
  {
    path: 'book/list/:id',
    component: BookListComponent
  }, {
    path: 'book/create',
    component: BookCreateComponent
  }, {
    path: 'book/edit',
    component: BookEditComponent
  }, {
    path: 'book/detail/:id',
    component: BookDetailComponent
  }, {
    path: 'best-selling-book',
    component: BestSellingBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
