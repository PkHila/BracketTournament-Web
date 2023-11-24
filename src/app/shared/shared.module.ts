import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { TemplateShowcaseListComponent } from './components/template-showcase-list/template-showcase-list.component';
import { TemplateShowcaseCardComponent } from './components/template-showcase-card/template-showcase-card.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    NavbarComponent,
    PageNotFoundComponent,
    TemplateShowcaseListComponent,
    TemplateShowcaseCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SearchBarComponent,
    NavbarComponent,
    PageNotFoundComponent,
    TemplateShowcaseListComponent,
    TemplateShowcaseCardComponent,
  ]
})
export class SharedModule { }
