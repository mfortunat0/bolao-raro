import Rodada from "./Rodada";
import ApostaJogo, { Palpite } from "./ApostaJogo";
import ApostaRodada from "./ApostaRodada";

export type UsuarioFile = {
  nome: string;
  senha: string;
  email: string;
};
export default class Usuario {
  protected nome: string;
  protected senha: string;
  protected status: boolean;
  protected readonly email: string;

  public constructor(nome: string, email: string, senha: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.status = true;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSenha() {
    return this.senha;
  }

  public setSenha(senha: string) {
    this.senha = senha;
  }

  getStatus() {
    return this.status;
  }

  public setStatus(status: boolean) {
    this.status = status;
  }

  public aposta(rodada: Rodada, palpites: Palpite[]): ApostaRodada {
    const listaJogos = palpites.map((palpite) => {
      return new ApostaJogo(
        this,
        rodada.getJogoById(palpite.jogoId),
        palpite.golsMandante,
        palpite.golsVisitante
      );
    });
    return new ApostaRodada(this, listaJogos, rodada.getNumeroRodada());
  }
}
