import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrailsComponent } from './trails/trails.component';
import { DetailComponent } from './detail/detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import {Ng2OrderModule} from 'ng2-order-pipe';
import { ReviewComponent } from './review/review.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { ClickOutsideDirective } from './clickOutside.directive';
import { Nopage404Component } from './nopage404/nopage404.component';
import { SavedTrailComponent } from './saved-trail/saved-trail.component';
import { AuthService } from './services/auth.service';
import { AboutUsComponent } from './about_us/about_us.component';
// import { AuthGuard } from 'auth-guard';
// import { TokenInterceptorService } from './services/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    TrailsComponent,
    DetailComponent,
    ContactUsComponent,
    ReviewComponent,
    GalleryComponent,
    AllReviewsComponent,
    RatingStarsComponent,
    ClickOutsideDirective,
    Nopage404Component,
    SavedTrailComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'aboutus',
        component: AboutUsComponent,
      },
      {
        path: 'trails',
        component: TrailsComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'custom/:paramValue',
        component: TrailsComponent,
      },
      {
        path: 'trails/:trailId',
        component: DetailComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },{
        path: 'review/:trailId',
        component: GalleryComponent,
      },
      {
        path: 'allreviews',
        component: AllReviewsComponent,
      },
      // {
      //   path: 'detail',
      //   component: DetailComponent,
      // },
      {
        path: 'contactUs',
        component: ContactUsComponent,
      },
      {
        path: 'savedTrails',
        component: SavedTrailComponent,
      },
      {
        path: '**',
        component: Nopage404Component,
      }
    ]),
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthService
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptorService,
  //   multi: true
  // }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
