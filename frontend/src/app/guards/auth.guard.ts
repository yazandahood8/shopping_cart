import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        return true;
      }
      this.router.navigate(['/login']);
    }
    return false;
  }
}
