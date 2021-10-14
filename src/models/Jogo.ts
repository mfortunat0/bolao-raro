import Time from "./Time";

export enum Ganhador {
  Mandante,
  Empate,
  Visitante,
}

export default class Jogo {
  protected static id = 0;
  protected readonly id: number;
  protected readonly mandante: Time;
  protected readonly visitante: Time;
  protected readonly dataHora: Date;
  protected golsMandante?: number;
  protected golsVisitante?: number;

  public constructor(mandante: Time, visitante: Time, dataHora: Date) {
    this.mandante = mandante;
    this.visitante = visitante;
    this.dataHora = dataHora;
    Jogo.id++;
    this.id = Jogo.id;
  }

  public getMandante(): Time {
    return this.mandante;
  }

  public getVisitante(): Time {
    return this.visitante;
  }

  public getId(): number {
    return this.id;
  }

  public getDataHora(): Date {
    return this.dataHora;
  }

  public getGolsMandante(): number {
    return this.golsMandante;
  }

  public getGolsVisitante(): number {
    return this.golsVisitante;
  }

  public atualizaResultado(golsMandante: number, golsVisitante: number): void {
    this.golsMandante += golsMandante;
    this.golsVisitante += golsVisitante;
  }

  public static getGanhador(
    golsMandante: number,
    golsVisitante: number
  ): Ganhador {
    if (golsMandante > golsVisitante) {
      return Ganhador.Mandante;
    } else if (golsVisitante > golsMandante) {
      return Ganhador.Visitante;
    } else {
      return Ganhador.Empate;
    }
  }
}
