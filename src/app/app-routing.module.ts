import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'vaccine',
    loadChildren: () => import('./module/vaccine/vaccine.module').then( m => m.VaccinePageModule)
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
