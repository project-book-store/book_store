import { Component, OnInit } from '@angular/core';
import {Promotion} from '../../model/promotion';
import {FormControl, FormGroup} from '@angular/forms';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {
  promotionList: Promotion[] = [];
  deleteList: Promotion[] = [];
  keySearch: string;
  searchForm = new FormGroup({
    content: new FormControl('')
  });

  checkNext: boolean;
  checkPreview: boolean;
  number: number;
  checkDelete = true;
  checkedAll = false;

  totalElements: number;
  pageSize = 5;

  numberOfElementFirst: number;
  numberOfElementFinal: number;
  checkError = true;

  constructor(private promotionService: PromotionService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page: number) {
    if (this.keySearch === 'null' || this.keySearch === '#') {
      return this.promotionList = [];
    }
    if (this.keySearch === undefined) {
      this.keySearch = '';
    }
    this.promotionService.getAll(page, this.keySearch, this.pageSize).subscribe((data?: any) => {
      if (data?.content.length < 1 || data?.content.length === undefined) {
        this.promotionList = [];
        return;
      }
      this.number = data?.number;
      this.checkNext = !data.last;
      this.checkPreview = !data.first;
      this.promotionList = data?.content;
      this.totalElements = data?.totalElements;
      this.numberOfElementFinal = 1 + data?.size * data?.number;
      this.numberOfElementFirst = data?.numberOfElements + data?.size * data?.number;
      this.isCheckedAll();
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  delete() {
    for (let i = 0; i < this.deleteList.length; i++) {
      this.promotionService.deletePromotion(this.deleteList[i].id).subscribe(() => {
        this.checkError = true;
        this.deleteList.splice(0, this.deleteList.length);
        this.checkDelete = this.deleteList.length < 1;
        this.ngOnInit();
      }, error => {
        this.checkError = false;
        this.toastrService.error(`Xóa không thành công.`, 'Cảnh báo');
        this.deleteList.splice(0, this.deleteList.length);
        console.log('error', error);
      });
    }
    if (this.checkError === true) {
      this.toastrService.success('Xóa thành công.', 'Thông báo');
    }
  }

  search() {
    this.keySearch = this.searchForm.value.content;
    this.ngOnInit();
  }

  getListDelete(promotion: Promotion) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === promotion.id) {
        this.deleteList.splice(i, 1);
        this.checkDelete = this.deleteList.length < 1;
        this.isCheckedAll();
        return;
      }
    }
    this.deleteList.push(promotion);
    this.isCheckedAll();
    this.checkDelete = this.deleteList.length < 1;
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number);
  }

  goNext() {
    this.number++;
    this.getAll(this.number);
  }

  checkbox(promotion: Promotion) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === promotion.id) {
        return true;
      }
    }
    return false;
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.ngOnInit();
        break;
    }
  }

  checkAll(event: any) {
    this.checkedAll = event.target.checked;
    if (this.checkedAll) {
      this.promotionList.forEach(item => {
        if (!this.checkbox(item)) {
          this.deleteList.push(item);
        }
      });
    } else {
      this.deleteList = this.deleteList.filter(item => !this.promotionList.some(item2 => item.id === item2.id));
    }
    this.checkDelete = this.deleteList.length < 1;
  }

  isCheckedAll() {
    const listDeleted = this.deleteList.filter((item) => this.promotionList.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
        (treatment, index) => index === listDeleted.findIndex(
            other => treatment.id === other.id
        )).length;
    this.checkedAll = (lengthDeleted === this.promotionList.length);
  }
}
