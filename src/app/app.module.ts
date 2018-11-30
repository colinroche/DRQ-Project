import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InformationComponent } from './information/information.component';
import { CharacterComponent } from './character/character.component';
import { AuthService } from './auth.service';
import { InfoService } from './info.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InformationComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, InfoService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    // allows multiple interceptors
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
