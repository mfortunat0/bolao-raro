import axios from "axios";

const brasileiraoApi = axios.create({
  baseURL:
    "https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/10",
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

  getTabela(): Promise<TabelaDto[]> {
    return brasileiraoApi
      .get<TabelaDto[]>("tabela", {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(
            `Falha ao acessar a API do brasileirão. Motivo: ${error.message}`
          );
        } else {
          throw error;
        }
      });
  }

  getRodadas(): Promise<unknown> {
    return brasileiraoApi
      .get<unknown>("rodadas", {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(
            `Falha ao acessar a API do brasileirão. Motivo: ${error.message}`
          );
        } else {
          throw error;
        }
      });
  }

  getRodadaByNumeroRodada(numeroRodada: number): Promise<RodadaDto> {
    return brasileiraoApi
      .get<RodadaDto>(`rodadas/${numeroRodada}`, {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(
            `Falha ao acessar a API do brasileirão. Motivo: ${error.message}`
          );
        } else {
          throw error;
        }
      });
  }
}
