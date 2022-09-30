import { Component, OnInit } from '@angular/core';
import {BookService} from '../../service/book.service';
import {Book} from '../../model/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  pageSize = 9;
  checkNext: boolean;
  checkPreview: boolean;
  number: number;
  totalElements: number;
  numberOfElementFirst: number;
  numberOfElementFinal: number;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page: number) {
    this.bookService.getAll(page, this.pageSize).subscribe((data?: any) => {
      this.bookList = data?.content;
      this.number = data?.number;
      this.checkNext = !data.last;
      this.checkPreview = !data.first;
      this.totalElements = data?.totalElements;
      this.numberOfElementFinal = 1 + data?.size * data?.number;
      this.numberOfElementFirst = data?.numberOfElements + data?.size * data?.number;
    });
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number);
  }

  goNext() {
    this.number++;
    this.getAll(this.number);
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '9':
        this.pageSize = 9;
        this.ngOnInit();
        break;
      case '18':
        this.pageSize = 18;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.ngOnInit();
        break;
    }
  }

}
