import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Promotion} from '../../model/promotion';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Book} from '../../model/book';
import {Category} from '../../model/category';
import {BookService} from '../../service/book.service';
import {CategoryService} from '../../service/category.service';

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
    bookForm: FormGroup = new FormGroup({
        id: new FormControl(''),
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
    id: number;

    constructor(private bookService: BookService,
                private categoryService: CategoryService,
                private promotionService: PromotionService,
                private toastr: ToastrService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = +paramMap.get('id');
        });
        this.bookService.findByBook(this.id).subscribe(value => {
            this.bookForm.patchValue(value);
            this.bookForm.patchValue({category: value.category.id});
            this.bookForm.patchValue({promotion: value.promotion.id});
        });
        this.categoryService.getAll().subscribe(value => {
            this.categoryList = value;
        });
        this.promotionService.getAllPromotion().subscribe(value => {
            this.promotionList = value;
        });
    }

    editBook() {
        this.book = this.bookForm.value;
        for (const item of this.categoryList) {
            if (item.id === this.book.category) {
                this.book.category = item;
            }
        }
        for (const item of this.promotionList) {
            if (item.id === this.book.promotion) {
                this.book.promotion = item;
            }
        }
        this.bookService.editBook(this.book).subscribe(value => {
            this.toastr.success('Cập nhập thông tin sách thành công', 'Thông báo');
            this.router.navigateByUrl('/book/manager');
        });
    }
}
