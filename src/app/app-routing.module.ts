import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './modules/home-page/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./modules/home-page/home-page.module").then(m => m.HomePageModule),
    component: LandingPageComponent
  },
  {
    path: 'view-template',
    loadChildren: () => import("./modules/view-template/view-template.module").then(m => m.ViewTemplateModule)
  },
  {
    path:'category',
    loadChildren: () => import("./modules/view-categories/view-categories.module").then(m => m.ViewCategoriesModule)
  },
  {
    path: 'create-template',
    loadChildren: () => import("./modules/choose-category/choose-category.module").then(m => m.ChooseCategoryModule)
  },
  {
    path: 'credits',
    loadChildren: () => import("./modules/view-credits/credits.module").then(m => m.CreditsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
