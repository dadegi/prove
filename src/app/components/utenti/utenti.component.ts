import { Component, OnInit } from '@angular/core';
import { UtentiService } from 'src/app/auth/service/utenti.service';
import { Utente } from 'src/app/models/utente.interface';

@Component({
    selector: 'app-utenti',
    templateUrl: './utenti.component.html',
    styleUrls: ['./utenti.component.scss'],
})
export class UtentiComponent implements OnInit {

    utenti!: Utente[];

    constructor(private utentiSrv: UtentiService) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.utentiSrv.recupera().subscribe((_utenti: Utente[]) => {
                this.utenti = _utenti;
            });
        }, 2000);
    }

    cancella(id: number) {
        this.utentiSrv.cancella(id).subscribe(() => {
                this.utenti = this.utenti.filter(elemento => elemento.id !== id);
                alert('Utente cancellato!');
            });
        }
    }
