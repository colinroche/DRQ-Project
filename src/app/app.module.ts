import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule} from '@angular/material';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InformationComponent } from './information/information.component';
import { CharacterComponent } from './character/character.component';

import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';


  const appRoutes: Routes = [
    {
      path: '',
      redirectTo: '/information',
      pathMatch: 'full'
    },
    {
      path: 'information',
      component: InformationComponent
    },
    {
      path: 'character',
      component: CharacterComponent,
      // when user trys to navigate to this page, guard is activated to insure they are logged in
      canActivate: [AuthGuard]
    },
    {
      path: 'details',
      component: DetailsComponent
    },
    {
      path: 'edit/:id',
      component: EditComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InformationComponent,
    CharacterComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule
  ],
  providers: [AuthService, AuthGuard, PostService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    // allows multiple interceptors
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
