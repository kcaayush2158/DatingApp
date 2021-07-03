import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { RoomsComponent } from './home/rooms/rooms.component';
import { ProfileComponent } from './home/profile/profile.component';
import { LikesComponent } from './home/likes/likes.component';
import { VisitsComponent } from './home/visits/visits.component';
import { SettingsComponent } from './home/settings/settings.component';
import { MyroomComponent } from './home/rooms/myroom/myroom.component';
import { AllroomComponent } from './home/rooms/allroom/allroom.component';
import { OnlineUsersComponent } from './home/online-users/online-users.component';
import { BroadcastComponent } from './home/broadcast/broadcast.component';
import { ProfilesComponent } from './home/profiles/profiles.component';
import { UserVisitComponent } from './user-visit/user-visit.component';
import { PeopleLikeComponent } from './home/likes/people-like/people-like.component';
import { YouLikeComponent } from './home/likes/you-like/you-like.component';
import { ImagesComponent } from './home/profile/images/images.component';
import { PhotosComponent } from './user-visit/photos/photos.component';
import { ChatsComponent } from './home/chats/chats.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UpgradePremiumComponent } from './upgrade/upgrade-premium/upgrade-premium.component';
import { UpgradeBasicComponent } from './upgrade/upgrade-basic/upgrade-basic.component';
import { MessageComponent } from './message/message.component';
import { BoostComponent } from './boost/boost.component';
import { RecoverComponent } from './login/recover/recover.component';
import { SearchComponent } from './home/profiles/search/search.component';
import { NearbyComponent } from './home/nearby/nearby.component';
import { SwitchGenderComponent } from './home/switch-gender/switch-gender.component';


const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'teams',component:TeamComponent},
  {path:'recover-password',component:RecoverComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent,children:[
    {path:':number/photos', canActivate:[AuthGuard] ,component:ImagesComponent},
  
  ]},
  {path:'message',canActivate:[AuthGuard],component:ChatsComponent},
  {path:'likes',canActivate:[AuthGuard],component:LikesComponent,children:[
    {path:'you-like',component:YouLikeComponent},
    {path:'liked-you',component:PeopleLikeComponent},
  ]},
  {path:'visits',canActivate:[AuthGuard],component:VisitsComponent},
  {path:'settings',canActivate:[AuthGuard],component:SettingsComponent},
  {path:'teams',component:TeamComponent},
  
  {path:'upgrade', canActivate:[AuthGuard],component:UpgradeComponent ,children:[
    {path:'basic',component:UpgradeBasicComponent},
    {path:'premium',component:UpgradePremiumComponent}
  ]},
  {path:'inbox/u/:id/:roomId', canActivate:[AuthGuard] ,component:MessageComponent,children:[

  ]},
  {path:'home',  canActivate:[AuthGuard] ,component:HomeComponent,children:[
    {path:'online-users',component:OnlineUsersComponent},
    {path:'broadcast',component:BroadcastComponent},
    {path:'nearby',component:NearbyComponent},
    {path:'switch-gender',component:SwitchGenderComponent},
    {path:'profiles',component:ProfilesComponent,children:[
    
     {path:'search', component:SearchComponent },
    ]},
    {path:'**' , redirectTo:'/home'}

  ],


}, 
  {path:'profile/:string',canActivate:[AuthGuard],component:UserVisitComponent,children:[
    {path:'photos', canActivate:[AuthGuard] ,component:PhotosComponent},
  ]},
  {path:'signup',component:SignupComponent},
  {path:'rooms', canActivate:[AuthGuard],component:RoomsComponent,
  children:[
    {path:'my-rooms',component:MyroomComponent},
    {path:'all-rooms',component:AllroomComponent},
    {path:':roomId',component:ChatsComponent}
  ]},
  {path:'search', canActivate:[AuthGuard], component:SearchComponent},
  {path:'boosts', canActivate:[AuthGuard],component:BoostComponent},
  {path:'**',component:Error404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// tslint:disable-next-line:max-line-length
export const routingComponents=[SearchComponent,NearbyComponent,LikesComponent,VisitsComponent,SettingsComponent,ProfileComponent,AppComponent,RoomsComponent,TeamComponent,Error404Component,SearchComponent,LoginComponent,HeaderComponent,FooterComponent,SignupComponent,IndexComponent,HomeComponent];
