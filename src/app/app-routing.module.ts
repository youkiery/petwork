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
    path: 'spa',
    loadChildren: () => import('./module/spa/spa.module').then( m => m.SpaPageModule)
  },
  {
    path: 'lookup',
    loadChildren: () => import('./module/lookup/lookup.module').then( m => m.LookupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./module/profile/profile.module').then( m => m.ProfilePageModule)
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
  },
  {
    path: 'accounting',
    loadChildren: () => import('./main/accounting/accounting.module').then( m => m.AccountingPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./module/manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'image',
    loadChildren: () => import('./modal/image/image.module').then( m => m.ImagePageModule)
  },
  {
    path: 'xquang',
    loadChildren: () => import('./module/xquang/xquang.module').then( m => m.XquangPageModule)
  },
  {
    path: 'sieuam',
    loadChildren: () => import('./module/sieuam/sieuam.module').then( m => m.SieuamPageModule)
  },
  {
    path: 'excel',
    loadChildren: () => import('./module/excel/excel.module').then( m => m.ExcelPageModule)
  },
  {
    path: 'other',
    loadChildren: () => import('./module/other/other.module').then( m => m.OtherPageModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./module/hotel/hotel.module').then( m => m.HotelPageModule)
  },
  {
    path: 'luong',
    loadChildren: () => import('./module/luong/luong.module').then( m => m.LuongPageModule)
  },
  {
    path: 'work',
    loadChildren: () => import('./module/work/work.module').then( m => m.WorkPageModule)
  },
  {
    path: 'vattu',
    loadChildren: () => import('./module/vattu/vattu.module').then( m => m.VattuPageModule)
  },
  {
    path: 'nhantin',
    loadChildren: () => import('./module/nhantin/nhantin.module').then( m => m.NhantinPageModule)
  },
  {
    path: 'nhomtin',
    loadChildren: () => import('./module/nhomtin/nhomtin.module').then( m => m.NhomtinPageModule)
  },
  {
    path: 'loinhuan',
    loadChildren: () => import('./module/loinhuan/loinhuan.module').then( m => m.LoinhuanPageModule)
  },
  {
    path: 'taichinh',
    loadChildren: () => import('./module/taichinh/taichinh.module').then( m => m.TaichinhPageModule)
  },
  {
    path: 'thietbi',
    loadChildren: () => import('./module/thietbi/thietbi.module').then( m => m.ThietbiPageModule)
  },
  {
    path: 'datlich',
    loadChildren: () => import('./module/datlich/datlich.module').then( m => m.DatlichPageModule)
  },
  {
    path: 'danhgia',
    loadChildren: () => import('./module/danhgia/danhgia.module').then( m => m.DanhgiaPageModule)
  },
  {
    path: 'chuyenmon',
    loadChildren: () => import('./module/chuyenmon/chuyenmon.module').then( m => m.ChuyenmonPageModule)
  },  {
    path: 'thongkenghi',
    loadChildren: () => import('./module/thongkenghi/thongkenghi.module').then( m => m.ThongkenghiPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
