import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Promotion} from '../../model/promotion';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.css']
})
export class PromotionEditComponent implements OnInit {
  promotionForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    promotionName: new FormControl(''),
    promotionCode: new FormControl(''),
    promotionPrice: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isDelete: new FormControl(0)
  });
  promotion: Promotion;
  id: number;

  constructor(private promotionService: PromotionService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
    this.promotionService.findByPromotion(this.id).subscribe(value => {
      this.promotionForm.patchValue(value);
    });
  }

  editPromotion() {
    this.promotion = this.promotionForm.value;
    this.promotionService.editPromotion(this.promotion).subscribe(value => {
      this.toastr.success('Cập nhập thông tin khuyến mãi thành công', 'Thông báo');
      this.router.navigateByUrl('/promotional');
    });
  }
}
