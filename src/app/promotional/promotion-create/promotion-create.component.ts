import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Promotion} from '../../model/promotion';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-promotion-create',
    templateUrl: './promotion-create.component.html',
    styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {
    promotionForm: FormGroup = new FormGroup({
        promotionName: new FormControl(''),
        promotionCode: new FormControl(''),
        promotionPrice: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        isDelete: new FormControl(0)
    });
    promotion: Promotion;

    constructor(private promotionService: PromotionService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    addPromotion() {
        this.promotion = this.promotionForm.value;
        this.promotionService.savePromotion(this.promotion).subscribe(value => {
            this.toastr.success('Thêm mới khuyến mãi thành công', 'Thông báo');
            this.router.navigateByUrl('/promotional');
        });
    }

    resetForm() {
        this.promotionForm.reset();
    }
}
