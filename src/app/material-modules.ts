import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from "@angular/material/tabs"
import { MatDialogModule } from "@angular/material/dialog"
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from "@angular/material/sort"
import {FileUploadModule}  from "ng2-file-upload";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from "@angular/material/paginator"


const modules = [
    MatPaginatorModule,
    MatSnackBarModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    FileUploadModule,
    MatSortModule,
    MatTableModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    AlertModule,
    MatFormFieldModule,
    LayoutModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule {
}