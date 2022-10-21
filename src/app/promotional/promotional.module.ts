import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionalRoutingModule } from './promotional-routing.module';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';


@NgModule({
  declarations: [
      PromotionCreateComponent,
      PromotionListComponent,
      PromotionEditComponent
  ],
    imports: [
        CommonModule,
        PromotionalRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ]
})
export class PromotionalModule { }
