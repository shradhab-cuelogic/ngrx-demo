import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe( res => {
      this.isLoggedIn = res ? true : false; 
    })
  }
  navbarOpen = false;
 
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
 

}
