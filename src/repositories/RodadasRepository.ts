import Rodada from "../models/Rodada";

export type FindAllCallback = (error: Error | null, rodadas: Rodada[]) => void;
export type SaveCallback = (error: Error | null) => void;

export default interface RodadasRepository {
  findAll(): Rodada[];
  findAllAsync(callback: FindAllCallback): void;
  save(rodadas: Rodada[]): void;
  saveAsync(rodadas: Rodada[], callback: SaveCallback): void;
}
