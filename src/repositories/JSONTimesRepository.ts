import Time from "../models/Time";
import TimesRepository, { FindAllCallback } from "./TimesRepository";
import { readFile, readFileSync } from "fs";
import { join } from "path";

const TIMES_FILE_PATH = join(__dirname, "../../files/times.json");

type TimeFile = {
  id: number;
  nome: string;
  estado: string;
};

export default class JSONTimesRepository implements TimesRepository {
  private timesFilePath: string;

  constructor(outrosTimes?: string) {
    this.timesFilePath = outrosTimes || TIMES_FILE_PATH;
  }

  public findAll(): Time[] {
    try {
      const fileContent: Buffer = readFileSync(this.timesFilePath);
      const timesSemClasse = JSON.parse(fileContent.toString()) as TimeFile[];
      return timesSemClasse.map(
        ({ id, nome, estado }) => new Time(id, nome, estado)
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os times. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  public findAllAsync(callback: FindAllCallback) {
    readFile(this.timesFilePath, (readFileError, fileContent: Buffer) => {
      if (readFileError) {
        const error = new Error(
          `Falha ao ler o arquivo, ${this.timesFilePath}. Motivo: ${readFileError.message}`
        );

        callback(error, null);
        return;
      }

      const timesSemClasse = JSON.parse(fileContent.toString()) as TimeFile[];
      const timesComClasse: Time[] = timesSemClasse.map(
        ({ id, nome, estado }) => new Time(id, nome, estado)
      );

      callback(null, timesComClasse);
    });
  }
}
