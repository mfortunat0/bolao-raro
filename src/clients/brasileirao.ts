import axios, { AxiosResponse } from "axios";

const brasileiraoApi = axios.create({
  baseURL:
    "https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos",
});

type TimeDto = {
  time_id: number;
  nome_popular: string;
};

type JogoDto = {
  partida_id: number;
  time_mandante: TimeDto;
  time_visitante: TimeDto;
  data_realizacao_iso: string;
  placar_mandante: number;
  placar_visitante: number;
};

type RodadaDto = {
  rodada: number;
  status: string;
  partidas: JogoDto[];
};

type TabelaDto = {
  time: TimeDto;
};

export class BrasileiraoClient {
  private readonly token: string;

  public constructor(token: string) {
    this.token = token;
  }

  async getTabela(campeonato: number): Promise<AxiosResponse<TabelaDto[]>> {
    return await brasileiraoApi.get<TabelaDto[]>(`${campeonato}/tabela`, {
      headers: {
        Authorization: `bearer ${this.token}`,
      },
    });
  }

  async getRodadas(campeonato: number): Promise<AxiosResponse<RodadaDto[]>> {
    return await brasileiraoApi.get<RodadaDto[]>(`${campeonato}/rodadas`, {
      headers: {
        Authorization: `bearer ${this.token}`,
      },
    });
  }

  async getRodadaByNumeroRodada(
    campeonato: number,
    numeroRodada: number
  ): Promise<AxiosResponse<RodadaDto>> {
    return await brasileiraoApi.get<RodadaDto>(
      `${campeonato}/rodadas/${numeroRodada}`,
      {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      }
    );
  }
}
