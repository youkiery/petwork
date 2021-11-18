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
    path: 'modal/manual',
    loadChildren: () => import('./modal/manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'modal/pet',
    loadChildren: () => import('./modal/pet/pet.module').then( m => m.PetPageModule)
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
    path: 'item',
    loadChildren: () => import('./module/item/item.module').then( m => m.ItemPageModule)
  },
  // {
  //   path: 'kaizen',
  //   loadChildren: () => import('./module/kaizen/kaizen.module').then( m => m.KaizenPageModule)
  // },
  {
    path: 'schedule',
    loadChildren: () => import('./module/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'his',
    loadChildren: () => import('./module/his/his.module').then( m => m.HisPageModule)
  },
  {
    path: 'price',
    loadChildren: () => import('./module/price/price.module').then( m => m.PricePageModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./module/transport/transport.module').then( m => m.TransportPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./main/manager/manager.module').then( m => m.ManagerPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./main/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'ride',
    loadChildren: () => import('./module/ride/ride.module').then( m => m.RidePageModule)
  },
  {
    path: 'physical',
    loadChildren: () => import('./module/physical/physical.module').then( m => m.PhysicalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
