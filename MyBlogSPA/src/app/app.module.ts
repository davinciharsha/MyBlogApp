import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavBarComponent } from './navBar/navBar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavBarComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
