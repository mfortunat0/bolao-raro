import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import Rodada from "../models/Rodada";
import RodadasRepository, {
  FindAllCallback,
  SaveCallback,
} from "./RodadasRepository";

const RODADAS_FILE_PATH = join(__dirname, "../../files/rodadas.json");

export default class JSONRodadasRepository implements RodadasRepository {
  private rodadasFilePath: string;

  public constructor() {
    this.rodadasFilePath = RODADAS_FILE_PATH;
  }
  public findAll(): Rodada[] {
    const fileContent: Rodada[] = JSON.parse(
      readFileSync(this.rodadasFilePath).toString()
    );
    return fileContent;
  }

  public save(rodadas: Rodada[]): void {
    try {
      const fileContent = JSON.stringify(rodadas);
      writeFileSync(this.rodadasFilePath, fileContent);
    } catch (error) {
      if (error instanceof error) {
        throw new Error(
          `Erro ao tentar escrever no arquivo ${this.rodadasFilePath}, motivo ${error}`
        );
      } else {
        throw error;
      }
    }
  }

  public saveAsync(rodadas: Rodada[], callback: SaveCallback) {
    const fileContent = JSON.stringify(rodadas);
    writeFile(this.rodadasFilePath, fileContent, (error) => {
      if (error) {
        const fileError = new Error(
          `Erro ao tentar escrever no arquivo ${this.rodadasFilePath}, motivo ${error}`
        );
        callback(fileError);
      } else {
        console.log("Arquivo salvado!!!");
      }
    });
  }

  public findAllAsync(callback: FindAllCallback) {
    readFile(this.rodadasFilePath, (error, fileContent) => {
      if (error) {
        const fileError = new Error(
          `Erro ao tentar ler o arquivo ${this.rodadasFilePath}, motivo ${error}`
        );
        callback(fileError, null);
      } else {
        callback(null, JSON.parse(fileContent.toString()));
      }
    });
  }
}
