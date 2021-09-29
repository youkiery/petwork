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
    path: 'modal/upload',
    loadChildren: () => import('./modal/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'modal/item',
    loadChildren: () => import('./modal/item/item.module').then( m => m.ItemPageModule)
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
    path: 'lookup',
    loadChildren: () => import('./module/lookup/lookup.module').then( m => m.LookupPageModule)
  },
  {
    path: 'fivemin',
    loadChildren: () => import('./module/fivemin/fivemin.module').then( m => m.FiveminPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./module/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'blood',
    loadChildren: () => import('./module/blood/blood.module').then( m => m.BloodPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./module/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'kaizen',
    loadChildren: () => import('./module/kaizen/kaizen.module').then( m => m.KaizenPageModule)
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./module/vehicle/vehicle.module').then( m => m.VehiclePageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./module/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'inout',
    loadChildren: () => import('./modal/inout/inout.module').then( m => m.InoutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
