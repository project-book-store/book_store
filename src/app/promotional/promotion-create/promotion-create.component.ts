import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-promotion-create',
    templateUrl: './promotion-create.component.html',
    styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {
    promotionForm: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
    }

    addPromotion() {

    }
}
