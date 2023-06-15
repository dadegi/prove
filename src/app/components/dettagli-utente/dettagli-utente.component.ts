import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente.interface';
import { UtentiService } from 'src/app/auth/service/utenti.service';
import { ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-dettagli-utente',
    templateUrl: './dettagli-utente.component.html',
    styleUrls: ['./dettagli-utente.component.scss'],
})
export class DettagliUtenteComponent implements OnInit {

    utente!: Utente;
    id!: number;

    constructor(private utentiSrv: UtentiService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(parametro => {
            console.log(parametro);
            this.id = +parametro['id'];
            console.log(this.id);
            this.caricaDettagli();
        });
    }

    caricaDettagli() {
        this.utentiSrv.dettaglioUtente(this.id).subscribe(dettaglio => {
            this.utente = dettaglio;
        });
    }
}
