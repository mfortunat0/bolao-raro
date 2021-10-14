import Usuario from "./Usuario";
import ApostaJogo from "./ApostaJogo";

export default class ApostaRodada {
  protected readonly usuario: Usuario;
  protected readonly apostasJogos: ApostaJogo[];

  public constructor(usuario: Usuario, apostasJogos: ApostaJogo[]) {
    this.usuario = usuario;
    this.apostasJogos = apostasJogos;
  }

  public atualizaPontuacao(): number {
    let pontos = 0;
    this.apostasJogos.forEach((aposta) => {
      pontos += aposta.atualizaPontuacao();
    });
    return pontos;
  }
}
