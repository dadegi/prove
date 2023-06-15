import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { Error404Component } from './components/error404/error404.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NuovoUtenteComponent } from './components/nuovo-utente/nuovo-utente.component';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';

const rotte: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'utenti',
        component: UtentiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'utenti/:id',
        component: DettagliUtenteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'nuovoUtente',
        component: NuovoUtenteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: Error404Component
    }
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        UtentiComponent,
        Error404Component,
        LoginComponent,
        RegisterComponent,
        NuovoUtenteComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(rotte)
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
