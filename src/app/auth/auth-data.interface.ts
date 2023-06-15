export interface AuthData {
    accessToken: string;
    user: {
        id: number;
        nome: string;
        cognome: string;
        email: string;
        corsi: number;
    };
}
