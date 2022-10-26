import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Promotion} from '../../model/promotion';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

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
    checkImgSize = false;
    regexImageUrl = false;
    editImageState = false;
    checkImg: boolean;
    url: any;
    msg = '';
    selectedImage: File = null;
    buttonAdvertisementStatus = true;

    constructor(private bookService: BookService,
                private categoryService: CategoryService,
                private promotionService: PromotionService,
                private toastr: ToastrService,
                private router: Router,
                private storage: AngularFireStorage) {
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
        const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
        const filePath = `${nameImg}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
                this.buttonAdvertisementStatus = false;
                fileRef.getDownloadURL().subscribe((url) => {
                    this.bookForm.patchValue({images: url});
                    this.book = this.bookForm.value;
                    this.bookService.saveBook(this.book).subscribe(value => {
                        this.toastr.success('Thêm mới sách thành công', 'Thông báo');
                        this.router.navigateByUrl('/book/manager');
                    });
                });
            })
        ).subscribe();
    }

    resetForm() {
        this.bookForm.reset();
    }

    onFileSelected(event) {
        this.regexImageUrl = false;
        if (event.target.files[0].size > 9000000) {
            return;
        }
        this.selectedImage = event.target.files[0];
        if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
            this.regexImageUrl = true;
            return;
        }
        this.bookForm.patchValue({imageUrl: this.selectedImage.name});
    }

    selectFile(event: any) {
        if (!event.target.files[0] || event.target.files[0].length === 0) {
            return;
        }
        if (event.target.files[0].size > 9000000) {
            return;
        }
        if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
            return;
        }
        this.checkImgSize = false;
        this.checkImg = false;
        this.editImageState = true;

        const mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.msg = 'Chỉ có file ảnh được hỗ trợ';
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        // tslint:disable-next-line:variable-name
        reader.onload = (_event) => {
            this.msg = '';
            this.url = reader.result;
        };
    }

    getCurrentDateTime(): string {
        return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
    }
}
