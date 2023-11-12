import { Component } from '@angular/core';
import { INote } from './model/INote';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nota';
  
  constructor(public loginService:LoginService, public translate:TranslateService){
    this.translate.addLangs(['es','en']);
    this.translate.setDefaultLang('es');
  }
  public alerta(){
    alert("Alerta Roja");
  }
}