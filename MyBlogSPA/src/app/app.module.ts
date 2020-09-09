import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavBarComponent } from './navBar/navBar.component';
import { AuthService } from '../../_Services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from '../../_Services/error.interceptor';
import { AlertifyService } from '../../_Services/alertify.service';
import { ListComponent } from './list/list.component';
import { MembersComponent } from '../app/mem/members/members.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './mem/member-card/member-card.component';
import { MemberDetailComponent } from './mem/member-detail/member-detail.component';
import { MemberEditComponent } from './mem/member-edit/member-edit.component';
import { PhotoEditorComponent } from './mem/photo-editor/photo-editor.component';
import { MemberDetailResolver } from '../_resolvers/member-detail.resolver';
import { MemberListResolver } from '../_resolvers/member-list.resolver';
import { MemberEditResolver } from '../_resolvers/member-edit.resolver';
import { PreventLosingUnsaved } from '../_guards/preventLosingUnsaved';
import { appRoutes } from '../app/routes';
import { TabsModule } from 'ngx-bootstrap/tabs';

// tslint:disable-next-line: typedef
export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavBarComponent,
      RegisterComponent,
      HomeComponent,
      ListComponent,
      MembersComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxGalleryModule,
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line: object-literal-shorthand
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:5000']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventLosingUnsaved
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
