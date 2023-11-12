import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; 
import { ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(
    public loginS: LoginService,
    private translate: TranslateService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }


  public logout() {
    this.loginS.signOut();
  }

  cambiarEspanol() {
    this.translate.use('es');
  }

  changeToEnglish() {
    this.translate.use('en');
  }
  toggleTheme() {
    console.log('Button Clicked');
    this.themeService.toggleTheme();
  }
}
