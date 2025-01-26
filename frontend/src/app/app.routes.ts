import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // Lazy-loaded routes
    {
        path: 'products',
        loadChildren: () => import('./pages/home/products.module').then(m => m.ProductsModule),
        canActivate: [AuthGuard], // Optional guard if needed
    },
    {
        path: 'my-cart',
        loadChildren: () => import('./pages/home/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard], // Optional guard if needed
    },
];
