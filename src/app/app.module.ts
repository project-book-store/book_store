import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyModule} from './body/body.module';
import {SecurityModule} from './security/security.module';
import {BookModule} from './book/book.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CheckoutModule} from './checkout/checkout.module';
import {HistoryModule} from './history/history.module';
import {OrderModule} from './order/order.module';
import {PromotionalModule} from './promotional/promotional.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {StatisticModule} from './statistic/statistic.module';
import {CustomerModule} from './customer/customer.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
    FacebookLoginProvider
} from 'angularx-social-login';
import {ChatModule} from './chat/chat.module';
import {DatePipe} from '@angular/common';
import {GamesModule} from './games/games.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        BodyModule,
        SecurityModule,
        BookModule,
        CheckoutModule,
        HistoryModule,
        OrderModule,
        PromotionalModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatSelectModule,
        MatOptionModule,
        MatTabsModule,
        MatIconModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatPaginatorModule,
        MatCheckboxModule,
        StatisticModule,
        CustomerModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        SocialLoginModule,
        ChatModule,
        GamesModule
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('513261670701543')
                    }
                ]
            } as SocialAuthServiceConfig,
        },
        DatePipe
    ],
    exports: [
        FooterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
