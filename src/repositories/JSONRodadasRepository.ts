import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import Rodada from "../models/Rodada";
import RodadasRepository from "./RodadasRepository";

const RODADAS_FILE_PATH = join(__dirname, "../../files/rodadas.json");

export default class JSONRodadasRepository implements RodadasRepository {
  public async findAll(): Promise<Rodada[]> {
    const fileContent: Buffer = await readFile(RODADAS_FILE_PATH);
    const rodadas: Rodada[] = JSON.parse(fileContent.toString()) as Rodada[];

    return rodadas;
  }

  public async findByNumeroRodada(numeroRodada: number): Promise<Rodada> {
    const fileContent: Buffer = await readFile(RODADAS_FILE_PATH);
    const rodadas: Rodada[] = JSON.parse(fileContent.toString()) as Rodada[];

    const rodada = rodadas.find(
      (rodada) => rodada.getNumeroRodada() === numeroRodada
    );

    return rodada;
  }

  public async save(rodadas: Rodada[]): Promise<void> {
    const fileContent = JSON.stringify(rodadas);
    await writeFile(RODADAS_FILE_PATH, fileContent);
  }
}
