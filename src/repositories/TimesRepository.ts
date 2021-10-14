import Time from "../models/Time";

export type FindAllCallback = (error: Error, times: Time[]) => void;

export default interface TimesRepository {
  findAll(): Time[];
  findAllAsync(callback: FindAllCallback): void;
}
