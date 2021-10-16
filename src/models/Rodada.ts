import Jogo from "./Jogo";

export default class Rodada {
  protected readonly numeroRodada: number;
  protected horarioLimite: Date;
  protected jogos: Jogo[] = [];

  public constructor(numeroRodada: number) {
    this.numeroRodada = numeroRodada;
  }

  public addJogo(jogo: Jogo): void {
    this.jogos.push(jogo);
    this.horarioLimite = jogo.getDataHora();
  }

  public getJogos(): Jogo[] {
    return this.jogos;
  }

  public getJogoById(jogoId: number): Jogo {
    return this.jogos.find((jogo) => jogo.getId() === jogoId);
  }

  public getNumeroRodada() {
    return this.numeroRodada;
  }

  public getHorarioLimiteAposta(): Date {
    return this.jogos
      .reduce((acc, cur) => (acc < cur ? acc : cur))
      .getDataHora();
  }
}
