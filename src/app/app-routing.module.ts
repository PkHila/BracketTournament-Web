import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import("./modules/home-page/home-page.module").then(m => m.HomePageModule) },
  {
    path: 'create-template', title: 'Crea un nuevo torneo',
    loadChildren: () => import("./modules/create-template/create-template.module").then(m => m.CreateTemplateModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
