import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],  // Import RouterModule for standalone component
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  // Define the logout method
  logout(event: Event): void {
    // Your logout logic here
    console.log('User logged out');
  }
}