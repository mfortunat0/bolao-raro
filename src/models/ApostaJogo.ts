import Jogo from "./Jogo";
import Usuario from "./Usuario";

export type Palpite = {
  jogoId: number;
  golsMandante: number;
  golsVisitante: number;
};

export default class ApostaJogo {
  protected readonly usuario: Usuario;
  protected readonly jogo: Jogo;
  protected readonly golsMandante: number;
  protected readonly golsVisitante: number;
  protected pontos?: number;

  public constructor(
    usuario: Usuario,
    jogo: Jogo,
    golsMandante: number,
    golsVisitante: number
  ) {
    this.usuario = usuario;
    this.jogo = jogo;
    this.golsMandante = golsMandante;
    this.golsVisitante = golsVisitante;
  }

  getusuario() {
    return this.usuario;
  }
  getjogo() {
    return this.jogo;
  }
  getgolsMandante() {
    return this.golsMandante;
  }
  getgolsVisitante() {
    return this.golsVisitante;
  }

  public atualizaPontuacao(): number {
    let pontos = 0;
    if (this.golsMandante === this.jogo.getGolsMandante()) {
      pontos += 3;
    }
    if (this.golsVisitante === this.jogo.getGolsVisitante()) {
      pontos += 3;
    }
    if (
      Jogo.getGanhador(this.golsMandante, this.golsVisitante) ===
      Jogo.getGanhador(
        this.jogo.getGolsMandante(),
        this.jogo.getGolsVisitante()
      )
    ) {
      pontos += 6;
    }
    return pontos;
  }
}
