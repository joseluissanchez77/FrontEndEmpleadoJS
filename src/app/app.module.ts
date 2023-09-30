import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './user/index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SaveComponent } from './user/save/save.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './user/edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    SaveComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
