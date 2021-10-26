import Time from "../models/Time";
import TimesRepository, { FindAllCallback } from "./TimesRepository";
import { readFile } from "fs/promises";
import { join } from "path";
import { writeFile } from "fs/promises";

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

  public async findAll(): Promise<Time[]> {
    const fileContent: Buffer = await readFile(this.timesFilePath);
    const times = JSON.parse(fileContent.toString()) as TimeFile[];
    return times.map(({ id, nome, estado }) => new Time(id, nome, estado));
  }

  public async findById(id: number): Promise<Time> {
    const times = await this.findAll();
    const time = times.find((time) => time.getId() === id);
    return new Time(time.getId(), time.getNome(), time.getEstado());
  }

  public async save(times: Time[]): Promise<void> {
    return await writeFile(TIMES_FILE_PATH, JSON.stringify(times));
  }

  public async update(time: Time): Promise<void> {
    const times = await this.findAll();
    times.forEach((oldTime) => {
      if (oldTime.getId() === time.getId()) {
        oldTime.setEstado(time.getEstado());
        oldTime.setNome(time.getNome());
      }
    });
    await this.save(times);
  }
}
