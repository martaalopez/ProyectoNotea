import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleSigninButtonModule, SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonComponent } from './components/button/button.component';
import { NotesService } from './services/notes.service';
import { LoginService } from './services/login.service';
import { environment } from '../environments/environment';
import { NoteComponent } from 'src/app/components/note/note.component';
import { CommonModule } from '@angular/common';
import { FormNoteComponent } from './components/form-note/form-note.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeService } from './services/theme.service';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/trdct/', '.json');
}

const appearance: MatFormFieldDefaultOptions = {
    appearance: 'outline', // Puedes cambiar a 'fill' o 'legacy' según tus preferencias
};

@NgModule({
    declarations: [
        AppComponent,
    
    ],
    providers: [
        ThemeService,
        NotesService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: true,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('803642093973-97hvja7vg2rvljf3nu7cfrfqpdan7544.apps.googleusercontent.com')
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: appearance,
        },
        LoginService
    ],
    bootstrap: [AppComponent],
    imports: [
        FormNoteComponent,
        NavbarComponent,
        CommonModule,
        GoogleSigninButtonModule,
        BrowserModule,
        AppRoutingModule,
        SocialLoginModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ]
})
export class AppModule { }
