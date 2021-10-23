import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import Rodada from "../models/Rodada";
import RodadasRepository, {
  FindAllCallback,
  SaveCallback,
} from "./RodadasRepository";

const RODADAS_FILE_PATH = join(__dirname, "../../files/rodadas.json");

export default class JSONRodadasRepository implements RodadasRepository {
  public findAll(): Promise<Rodada[]> {
    const fileContent: Rodada[] = JSON.parse(
      readFileSync(RODADAS_FILE_PATH).toString()
    ) as Rodada[];
    return Promise.resolve(fileContent);
  }

  public findByNumeroRodada(numeroRodada: number): Promise<Rodada> {
    const fileContent: Rodada[] = JSON.parse(
      readFileSync(RODADAS_FILE_PATH).toString()
    ) as Rodada[];
    const rodada = fileContent.find(
      (rodada) => rodada.getNumeroRodada() === numeroRodada
    );
    return Promise.resolve(rodada);
  }

  public save(rodadas: Rodada[]): void {
    try {
      const fileContent = JSON.stringify(rodadas);
      writeFileSync(RODADAS_FILE_PATH, fileContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Erro ao tentar escrever no arquivo ${RODADAS_FILE_PATH}, motivo ${error.message}`
        );
      } else {
        throw error;
      }
    }
  }

  public saveAsync(rodadas: Rodada[], callback: SaveCallback) {
    const fileContent = JSON.stringify(rodadas);
    writeFile(RODADAS_FILE_PATH, fileContent, (error) => {
      if (error) {
        const fileError = new Error(
          `Erro ao tentar escrever no arquivo ${RODADAS_FILE_PATH}, motivo ${error.message}`
        );
        callback(fileError);
      } else {
        console.log("Arquivo salvado!!!");
      }
    });
  }

  public findAllAsync(callback: FindAllCallback) {
    readFile(RODADAS_FILE_PATH, (error, fileContent) => {
      if (error) {
        const fileError = new Error(
          `Erro ao tentar ler o arquivo ${RODADAS_FILE_PATH}, motivo ${error.message}`
        );
        callback(fileError, null);
      } else {
        callback(null, JSON.parse(fileContent.toString()));
      }
    });
  }
}
