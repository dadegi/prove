import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Utente } from 'src/app/models/utente.interface';

@Injectable({
    providedIn: 'root',
})
export class UtentiService {

    baseURL = environment.baseURL;

    constructor(private http: HttpClient) {}

    recupera() {
        return this.http.get<Utente[]>(`${this.baseURL}utenti`);
    }

    dettaglioUtente(id: number) {
        return this.http.get<Utente>(`${this.baseURL}utenti/${id}`);
    }

    cancella(id: number) {
        return this.http.delete<Utente>(`${this.baseURL}utenti/${id}`);
    }

    aggiungi(dati: Utente) {
        return this.http.post<Utente>(`${this.baseURL}utenti`, dati);
    }
}
