import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => {
      this.id = +value.get('id');
    });
    this.getBook(this.id);
  }

  getBook(id: number) {
    this.bookService.findById(id).subscribe(data => {
      this.book = data;
    });
  }
}
