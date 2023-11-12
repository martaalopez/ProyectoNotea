import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';

// Extendemos SocialUser para agregar la propiedad id_user
interface CustomSocialUser extends SocialUser {
  id_user?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user!: CustomSocialUser; // Usamos la versión extendida de SocialUser
  loggedIn = false;
  originalPath!: string;

  constructor(private authService: SocialAuthService, private router: Router) {
    this.isAuth();
    this.authService.authState.subscribe((user) => {
      this.user = user as CustomSocialUser;
      this.loggedIn = user !== null;
      if (this.loggedIn) {
        // Utiliza el correo electrónico como id_user
        this.user.id_user = this.user.email || '';
        localStorage.setItem('user', JSON.stringify(this.user));
        if (this.originalPath) {
          this.router.navigate([this.originalPath]);
          this.originalPath = '';
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser) as CustomSocialUser;
      this.loggedIn = true;
    }
  }

  isAuth(): boolean {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser) as CustomSocialUser;
      this.loggedIn = true;
    }
    return this.loggedIn;
  }

  async refreshToken(): Promise<void> {
    return this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  async signOut(): Promise<void> {
    this.user = null as any;
    this.loggedIn = false;
    localStorage.removeItem('user');
    return new Promise(async (resolve) => {
      try {
        await this.authService.signOut();
        resolve();
      } catch (e) {
        resolve();
      }
    });
  }
}
