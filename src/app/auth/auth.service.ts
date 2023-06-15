import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    baseURL = environment.baseURL;
    utente!: AuthData;
    jwtHelper = new JwtHelperService();
    private authSubj = new BehaviorSubject<null | AuthData>(null);
    user$ = this.authSubj.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    login(data: {email: string, password: string}) {
        return this.http.post<AuthData>(`${this.baseURL}login`, data).pipe(
            tap((data) => {
                console.log(data);
                this.authSubj.next(data);
                this.utente = data;
                console.log(this.utente);
                localStorage.setItem('user', JSON.stringify(data));
            })
        )
    }

    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    restore() {
        const utenteLoggato = localStorage.getItem('user');
        if (!utenteLoggato) {
            return;
        }

        const datiUtente: AuthData = JSON.parse(utenteLoggato);
        if (this.jwtHelper.isTokenExpired(datiUtente.accessToken)) {
            return;
        }
        this.authSubj.next(datiUtente);
    }

    registra(data: {
        nome: string,
        cognome: string,
        email: string,
        password: string,
        corsi: number
    }) {
        return this.http.post(`${this.baseURL}register`, data);
    }
}
