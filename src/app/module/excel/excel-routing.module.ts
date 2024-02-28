import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelPage } from './excel.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelPage
  },
  {
    path: 'manager',
    loadChildren: () => import('./excelmanager/excelmanager.module').then( m => m.ExcelmanagerPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./excelconfig/excelconfig.module').then( m => m.ExcelconfigPageModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./excelhotel/excelhotel.module').then( m => m.ExcelhotelPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./excelcustomer/excelcustomer.module').then( m => m.ExcelcustomerPageModule)
  },
  {
    path: 'configform',
    loadChildren: () => import('./excelconfigform/excelconfigform.module').then( m => m.ExcelconfigformPageModule)
  },
  {
    path: 'dangkylich',
    loadChildren: () => import('./exceldangkylich/exceldangkylich.module').then( m => m.ExceldangkylichPageModule)
  },
  {
    path: 'loaivaccine',
    loadChildren: () => import('./excelloaivaccine/excelloaivaccine.module').then( m => m.ExcelloaivaccinePageModule)
  },
  {
    path: 'spa',
    loadChildren: () => import('./excelspa/excelspa.module').then( m => m.ExcelspaPageModule)
  },
  {
    path: 'benhnhan',
    loadChildren: () => import('./excelbenhnhan/excelbenhnhan.module').then( m => m.ExcelbenhnhanPageModule)
  },
  {
    path: 'themcauhinh',
    loadChildren: () => import('./excelthemcauhinh/excelthemcauhinh.module').then( m => m.ExcelthemcauhinhPageModule)
  },
  {
    path: 'loinhuan',
    loadChildren: () => import('./excelloinhuan/excelloinhuan.module').then( m => m.ExcelloinhuanPageModule)
  },
  {
    path: 'sualoinhuan',
    loadChildren: () => import('./excelsualoinhuan/excelsualoinhuan.module').then( m => m.ExcelsualoinhuanPageModule)
  },
  {
    path: 'thongke',
    loadChildren: () => import('./excelthongke/excelthongke.module').then( m => m.ExcelthongkePageModule)
  },
  {
    path: 'themspa',
    loadChildren: () => import('./excelthemspa/excelthemspa.module').then( m => m.ExcelthemspaPageModule)
  },
  {
    path: 'themkieu',
    loadChildren: () => import('./excelthemkieu/excelthemkieu.module').then( m => m.ExcelthemkieuPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelPageRoutingModule {}
