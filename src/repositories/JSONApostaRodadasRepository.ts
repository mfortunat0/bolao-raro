import ApostaRodada from "../models/ApostaRodada";
import ApostaRodadasRepository from "./ApostaRodadasRepository";
import { readFileSync } from "fs";
import Usuario from "../models/Usuario";
import ApostaJogo from "../models/ApostaJogo";

const APOSTA_RODADAS_FILE_PATH = "./files/aposta-rodadas.json";

type ApostaRodadaFile = {
  usuario: Usuario;
  apostasJogos: ApostaJogo[];
};

export default class JSONApostaRodadasRepository
  implements ApostaRodadasRepository
{
  public findAll(): Promise<ApostaRodada[]> {
    const fileContent = JSON.parse(
      readFileSync(APOSTA_RODADAS_FILE_PATH).toString()
    ) as ApostaRodadaFile[];

    const apostaRodadas = fileContent.map(
      (apostaRodada) =>
        new ApostaRodada(apostaRodada.usuario, apostaRodada.apostasJogos)
    );

    return Promise.resolve(apostaRodadas);
  }

  public findByNumeroRodadaEUsuario(
    numeroRodada: number,
    emailUsuario: string
  ): Promise<ApostaRodada> {
    const fileContent = JSON.parse(
      readFileSync(APOSTA_RODADAS_FILE_PATH).toString()
    ) as ApostaRodadaFile[];

    const rodada = fileContent.find(
      (rodada) => rodada.usuario.getEmail() === emailUsuario && rodada
    );
    return Promise.reject("Não implementado");
  }

  // ---- Recupera apostas rodadas pelo numero de uma rodada

  public findByNumeroRodada(numeroRodada: number): Promise<ApostaRodada[]> {
    // @todo
    return Promise.reject("Não implementado");
  }

  // ---- Recupera todas apostas rodadas de um usuario

  public findByUsuario(emailUsuario: string): Promise<ApostaRodada[]> {
    // @todo
    return Promise.reject("Não implementado");
  }

  // ---- Salva uma aposta rodada

  public save(apostaRodada: ApostaRodada): Promise<void> {
    // @todo
    return Promise.reject("Não implementado");
  }
}
