import JSONRodadasRepository from "../repositories/JSONRodadasRepository";
import { BrasileiraoClient } from "../clients/brasileirao";
import RodadaRepository from "../repositories/RodadasRepository";
import TimesRepository from "../repositories/TimesRepository";
import Jogo from "../models/Jogo";
import Time from "../models/Time";
import Rodada from "../models/Rodada";
import JSONTimesRepository from "../repositories/JSONTimesRepository";

class BrasileiraoService {
  private readonly rodadaRepository: RodadaRepository =
    new JSONRodadasRepository();
  private readonly timesRepository: TimesRepository = new JSONTimesRepository();
  public async saveRodada() {
    const api = new BrasileiraoClient(
      "d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361"
    );
    const rodadas: Rodada[] = [];
    for (let c = 0; c < 39; c++) {
      const response = await api.getRodadaByNumeroRodada(c);
      const jogos: Jogo[] = response.partidas.map((jogo) => {
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
      rodadas.push(new Rodada(c));
      jogos.forEach((jogo) => rodadas[c].addJogo(jogo));
    }
    this.rodadaRepository.save(rodadas);
  }

  public async saveTimes() {
    const api = new BrasileiraoClient(
      "d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361"
    );
    const response = await api.getTabela();
    const times: Time[] = response.map((tabela) => {
      const id = tabela.time.time_id;
      const nome = tabela.time.nome_popular;
      return new Time(id, nome, "");
    });
    this.timesRepository.save(times);
  }
}

const test = new BrasileiraoService();
test.saveRodada().catch((error) => console.log(error));
