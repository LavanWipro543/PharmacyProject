import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { CustomerDashboard } from './pages/customer/customer-dashboard/customer-dashboard';
import { PharmacistDashboard } from './pages/pharmacist/pharmacist-dashboard/pharmacist-dashboard';
import { Medicines } from './pages/medicines/medicines';
import { Cart } from './pages/cart/cart';
import { Orders } from './pages/orders/orders';
import { Prescriptions } from './pages/prescriptions/prescriptions';
import { Notifications } from './pages/notifications/notifications';
import { Inventory } from './pages/inventory/inventory';
import { PrescriptionManagement } from './pages/pharmacist/prescription-management/prescription-management';
import { AllOrders } from './pages/admin/all-orders/all-orders';
import { Profile } from './pages/profile/profile';
import { LowStock } from './pages/low-stock/low-stock';

const routes: Routes = [
  { path: '', component: Home },
{ path: 'login', component: Login },
{ path: 'register', component: Register },

{ path: 'admin/dashboard', component: AdminDashboard },
{ path: 'customer/dashboard', component: CustomerDashboard },
{ path: 'pharmacist/dashboard', component: PharmacistDashboard },
{path: 'notifications',component: Notifications},
{ path: 'medicines', component: Medicines },
{ path: 'cart', component: Cart },
{ path: 'orders', component: Orders },
{ path: 'prescriptions', component: Prescriptions },
{path: 'inventory',component: Inventory},
{path: 'prescription-management',component: PrescriptionManagement},
{path: 'all-orders',component:AllOrders },
{path: 'profile',component: Profile},
{path: 'low-stock',component: LowStock},
 { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
