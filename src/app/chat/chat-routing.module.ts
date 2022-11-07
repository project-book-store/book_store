import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomlistComponent} from './roomlist/roomlist.component';
import {AddroomComponent} from './addroom/addroom.component';
import {ChatroomComponent} from './chatroom/chatroom.component';
import {LoginChatComponent} from './login-chat/login-chat.component';


const routes: Routes = [
  { path: 'login-chat', component: LoginChatComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chat/:roomname', component: ChatroomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
