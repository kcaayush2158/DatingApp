import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'; 
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider} from 'ng4-social-login';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { PasswordValidatorDirective } from './signup/password-validator.directive';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const config = new AuthServiceConfig([
  {
    id:GoogleLoginProvider.PROVIDER_ID,
    provider:new GoogleLoginProvider('22119547152-2g9s7qfblgkj240qbst19ursf8brvk92.apps.googleusercontent.com')
  },
  {
    id:FacebookLoginProvider.PROVIDER_ID,
    provider:new FacebookLoginProvider('528720724577726')
  }
],false);

export function  provideConfig(){
  return config;
}



@NgModule({
  declarations: [
    AppComponent,   
    routingComponents, IndexComponent, PasswordValidatorDirective, HomeComponent, SearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {provide:AuthServiceConfig,useFactory:provideConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
