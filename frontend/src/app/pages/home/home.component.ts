import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MenuComponent, CommonModule,RouterOutlet]

})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
   
  }
}
