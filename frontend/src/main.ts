import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';  // Import HttpClient configuration
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/interceptors/http.interceptor';  // Your interceptor file
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Your routes

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),  // Ensure HttpClient with interceptor is provided
    provideRouter(routes)
  ]
});
