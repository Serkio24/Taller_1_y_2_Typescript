export class Serie {
    name: string;
    canal: string;
    temporadas: number;
    descripcion: string;
    poster: string;
    url: string;


    constructor(name: string, canal: string, temporadas: number, descripcion: string, poster: string, url: string) {
        this.name = name;
        this.canal = canal;
        this.temporadas = temporadas;
        this.descripcion = descripcion;
        this.poster = poster;
        this.url = url;
    }
}