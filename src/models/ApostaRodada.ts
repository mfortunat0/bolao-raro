import Usuario from "./Usuario";
import ApostaJogo from "./ApostaJogo";

export default class ApostaRodada {
  protected readonly usuario: Usuario;
  protected readonly apostasJogos: ApostaJogo[];
  protected readonly numeroRodada: number;

  public constructor(
    usuario: Usuario,
    apostasJogos: ApostaJogo[],
    numeroRodada: number
  ) {
    this.usuario = usuario;
    this.apostasJogos = apostasJogos;
    this.numeroRodada = numeroRodada;
  }

  public atualizaPontuacao(): number {
    let pontos = 0;
    this.apostasJogos.forEach((aposta) => {
      pontos += aposta.atualizaPontuacao();
    });
    return pontos;
  }

  public getUsuario() {
    return this.usuario;
  }

  public getApostasJogos() {
    return this.apostasJogos;
  }

  public getNumeroRodada() {
    return this.numeroRodada;
  }
}
