import "dotenv/config";
import JSONRodadasRepository from "../repositories/JSONRodadasRepository";
import { BrasileiraoClient } from "../clients/brasileirao";
import RodadaRepository from "../repositories/RodadasRepository";
import TimesRepository from "../repositories/TimesRepository";
import Jogo from "../models/Jogo";
import Time from "../models/Time";
import Rodada from "../models/Rodada";
import JSONTimesRepository from "../repositories/JSONTimesRepository";

export class BrasileiraoService {
  private readonly rodadaRepository: RodadaRepository =
    new JSONRodadasRepository();
  private readonly timesRepository: TimesRepository = new JSONTimesRepository();

  public async saveRodada(): Promise<void> {
    const api = new BrasileiraoClient(process.env.TOKEN);
    const { data: rodadasResponse } = await api.getRodadas(10);

    const rodadas: Rodada[] = await Promise.all(
      rodadasResponse.map(async (rodadaResponse, indice) => {
        const { data } = await api.getRodadaByNumeroRodada(10, indice + 1);
        const jogos: Jogo[] = data.partidas.map((jogo) => {
          const mandante = new Time(
            jogo.time_mandante.time_id,
            jogo.time_mandante.nome_popular,
            ""
          );
          const visitante = new Time(
            jogo.time_visitante.time_id,
            jogo.time_visitante.nome_popular,
            ""
          );
          const data = new Date(
            jogo.data_realizacao_iso
              ? jogo.data_realizacao_iso
              : new Date().toISOString()
          );
          return new Jogo(mandante, visitante, data);
        });
        const rodada = new Rodada(rodadaResponse.rodada);
        jogos.forEach((jogo) => rodada.addJogo(jogo));
        return rodada;
      })
    );
    await this.rodadaRepository.save(rodadas);
  }

  public async saveTimes(): Promise<void> {
    const api = new BrasileiraoClient(process.env.TOKEN);
    const { data } = await api.getTabela(10);
    const times: Time[] = data.map((tabela) => {
      const id = tabela.time.time_id;
      const nome = tabela.time.nome_popular;
      return new Time(id, nome, "");
    });
    await this.timesRepository.save(times);
  }
}
