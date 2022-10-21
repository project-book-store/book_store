import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Promotion} from '../../model/promotion';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    bookCode: new FormControl(''),
    nameBook: new FormControl(''),
    images: new FormControl(''),
    author: new FormControl(''),
    translator: new FormControl(''),
    publishingCompany: new FormControl(''),
    numberPages: new FormControl(''),
    size: new FormControl(''),
    releaseDate: new FormControl(''),
    price: new FormControl(''),
    amount: new FormControl(''),
    isDelete: new FormControl(''),
    category: new FormControl(''),
    promotion: new FormControl(''),
  });
  book: Book;
  categoryList: Category[] = [];
  promotionList: Promotion[] = [];

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private promotionService: PromotionService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(value => {
      this.categoryList = value;
      this.bookForm.patchValue({category: value[0]});
    });
    this.promotionService.getAllPromotion().subscribe(value => {
      this.promotionList = value;
      this.bookForm.patchValue({promotion: value[0]});
    });
  }

  addBook() {
    this.book = this.bookForm.value;
    this.bookService.saveBook(this.book).subscribe(value => {
      this.toastr.success('Thêm mới sách thành công', 'Thông báo');
      this.router.navigateByUrl('/book/manager');
    });
  }

  resetForm() {
    this.bookForm.reset();
  }
}
