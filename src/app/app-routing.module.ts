import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'modal/insert',
    loadChildren: () => import('./modal/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'modal/suggest',
    loadChildren: () => import('./modal/suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'modal/recall',
    loadChildren: () => import('./modal/recall/recall.module').then( m => m.RecallPageModule)
  },
  {
    path: 'modal/detail',
    loadChildren: () => import('./modal/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'modal/filter',
    loadChildren: () => import('./modal/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./main/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./main/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./main/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./module/vaccine/vaccine.module').then( m => m.VaccinePageModule)
  },
  {
    path: 'usg',
    loadChildren: () => import('./module/usg/usg.module').then( m => m.UsgPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./module/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'spa',
    loadChildren: () => import('./module/spa/spa.module').then( m => m.SpaPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./modal/upload/upload.module').then( m => m.UploadPageModule)
  },  {
    path: 'lookup',
    loadChildren: () => import('./module/lookup/lookup.module').then( m => m.LookupPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
