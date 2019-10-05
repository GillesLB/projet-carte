export interface IPays {
  paysId: number;
  nom: string;
  etat: string;
  date: string;
  latitude: number;
  longitude: number;
}

export class Pays implements IPays {

  constructor(
    public paysId: number,
    public nom: string,
    public etat: string,
    public date: string,
    public latitude: number,
    public longitude: number,
  ) {}

}
