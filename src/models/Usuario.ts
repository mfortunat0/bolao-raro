import Rodada from "./Rodada";
import ApostaJogo, { Palpite } from "./ApostaJogo";
import ApostaRodada from "./ApostaRodada";

export default class Usuario {
  protected nome: string;
  protected senha: string
  protected readonly email: string;

  public constructor(nome: string, email: string, senha: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
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

  public getSenha(){
    return this.senha
  }

  public setSenha(senha: string){
    this.senha = senha
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
    return new ApostaRodada(this, listaJogos);
  }
}
