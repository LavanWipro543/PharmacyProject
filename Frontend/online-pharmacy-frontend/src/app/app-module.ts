import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './core/interceptors/auth-interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
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

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    Home,
    Login,
    Register,
    AdminDashboard,
    CustomerDashboard,
    PharmacistDashboard,
    Medicines,
    Cart,
    Orders,
    Prescriptions,
    Notifications,
    Inventory,
    PrescriptionManagement,
    AllOrders,
    Profile,
    LowStock,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
