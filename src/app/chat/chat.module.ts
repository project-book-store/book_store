import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import {RoomlistComponent} from './roomlist/roomlist.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ChatroomComponent } from './chatroom/chatroom.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AddroomComponent } from './addroom/addroom.component';
import { LoginChatComponent } from './login-chat/login-chat.component';


@NgModule({
  declarations: [
      RoomlistComponent,
      ChatroomComponent,
      AddroomComponent,
      LoginChatComponent
  ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class ChatModule { }
