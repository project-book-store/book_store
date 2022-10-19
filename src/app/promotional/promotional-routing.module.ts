import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PromotionListComponent} from './promotion-list/promotion-list.component';
import {PromotionCreateComponent} from './promotion-create/promotion-create.component';


const routes: Routes = [
  {
    path: 'promotional',
    component: PromotionListComponent
  }, {
    path: 'promotional/create',
    component: PromotionCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionalRoutingModule { }
