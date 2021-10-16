import ApostaRodada from "../models/ApostaRodada";
import ApostaRodadasRepository from "./ApostaRodadasRepository";
import { readFile, writeFile } from "fs/promises";
import Usuario, { UsuarioFile } from "../models/Usuario";
import ApostaJogo from "../models/ApostaJogo";
import { join } from "path";

const APOSTA_RODADAS_FILE_PATH = join(__dirname, "./files/aposta-rodadas.json");

type ApostaRodadaFile = {
  numeroRodada: number;
  usuario: UsuarioFile;
  apostasJogos: ApostaJogo[];
};

export default class JSONApostaRodadasRepository
  implements ApostaRodadasRepository
{
  private apostaRodadaFilePath: string;

  constructor(outrosUsuarios?: string) {
    this.apostaRodadaFilePath = outrosUsuarios || APOSTA_RODADAS_FILE_PATH;
  }

  public async findAll(): Promise<ApostaRodada[]> {
    return readFile(this.apostaRodadaFilePath)
      .then((data) => {
        const fileContent = JSON.parse(data.toString()) as ApostaRodadaFile[];
        const apostaRodadas = fileContent.map((apostaRodada) => {
          const nome = apostaRodada.usuario.nome;
          const email = apostaRodada.usuario.email;
          const senha = apostaRodada.usuario.senha;
          const usuario = new Usuario(nome, email, senha);
          const numeroRodada = apostaRodada.numeroRodada;
          const apostaJogos = apostaRodada.apostasJogos.map((apostaJogo) => {
            return new ApostaJogo(
              usuario,
              apostaJogo.getjogo(),
              apostaJogo.getgolsMandante(),
              apostaJogo.getgolsVisitante()
            );
          });
          return new ApostaRodada(usuario, apostaJogos, numeroRodada);
        });
        return apostaRodadas;
      })
      .catch((error: any) => {
        if (error instanceof Error) {
          throw new Error(
            `Falha ao carregar as Apostas das Rodadas. Motivo: ${error.message}`
          );
        } else {
          throw error;
        }
      });
  }

  public async findByNumeroRodadaEUsuario(
    numeroRodada: number,
    emailUsuario: string
  ): Promise<ApostaRodada> {
    try {
      const rodadas = await this.findAll();
      const result = rodadas.find(
        (rodada) =>
          rodada.getUsuario().getEmail() === emailUsuario &&
          rodada.getNumeroRodada() === numeroRodada
      );
      if (!result) {
        throw new Error(`Rodada não existente`);
      }
      return result;
    } catch (error) {
      throw new Error(`Algo deu errado. Motivo: ${error.message}`);
    }
  }

  public async findByNumeroRodada(
    numeroRodada: number
  ): Promise<ApostaRodada[]> {
    try {
      const rodadas = await this.findAll();
      const result = rodadas.filter(
        (rodada) => rodada.getNumeroRodada() === numeroRodada
      );
      if (result.length === 0) {
        throw new Error("Rodada não existente");
      }
      return result;
    } catch (error) {
      throw new Error(`Algo deu errado. Motivo: ${error.message}`);
    }
  }

  public async findByUsuario(emailUsuario: string): Promise<ApostaRodada[]> {
    try {
      const rodadas = await this.findAll();
      const result = rodadas.filter(
        (rodada) => rodada.getUsuario().getEmail() === emailUsuario
      );
      if (result.length === 0) {
        throw new Error(`Nao existe apostas para o email ${emailUsuario}`);
      }
      return result;
    } catch (error) {
      throw new Error(`Algo deu errado. Motivo: ${error.message}`);
    }
  }

  public async save(apostaRodada: ApostaRodada): Promise<void> {
    writeFile(this.apostaRodadaFilePath, JSON.stringify(apostaRodada)).catch(
      (error: any) => {
        if (error instanceof Error) {
          throw new Error(
            `Falha ao salvar as Apostas das Rodadas. Motivo: ${error.message}`
          );
        } else {
          throw error;
        }
      }
    );
  }
}
