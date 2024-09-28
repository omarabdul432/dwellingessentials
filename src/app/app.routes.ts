import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { LandingComponent } from './pages/admin/website/landing/landing.component';
import { WebProductComponent } from './pages/admin/website/web-product/web-product.component';
import { CheckoutComponent } from './pages/admin/website/checkout/checkout.component';
import { SigninComponent } from './pages/admin/website/signin/signin.component';
import { SignupComponent } from './pages/admin/website/signup/signup.component';
import { CategoryProductsComponent } from './pages/admin/website/category-products/category-products.component';
import { guardsGuard } from './guards.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'allproducts',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signin',
        component: SigninComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: 'allproducts',
                component: WebProductComponent,
            },
            {
                path: 'category',
                component: CategoryProductsComponent,
                canActivate: [guardsGuard]
            },
            {
                path: 'checkout/:id',
                component: CheckoutComponent, canActivate: [guardsGuard]
            },
        ],
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'products', component: ProductsComponent },
            { path: 'orders', component: OrdersComponent },
        ],
    },
];
