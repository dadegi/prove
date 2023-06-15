import { Component, OnInit } from '@angular/core';
import { UtentiService } from 'src/app/auth/service/utenti.service';
import { Utente } from 'src/app/models/utente.interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nuovo-utente',
    templateUrl: './nuovo-utente.component.html',
    styleUrls: ['./nuovo-utente.component.scss'],
})
export class NuovoUtenteComponent implements OnInit {

    utente!: Utente;

    constructor(private utentiSrv: UtentiService, private router: Router) {}

    ngOnInit(): void {}

    aggiungiUtente(form: NgForm) {
        this.utente = form.value;
        console.log(this.utente);
        this.utentiSrv.aggiungi(this.utente).subscribe();
        this.router.navigate(['/utenti']);
    }
}
