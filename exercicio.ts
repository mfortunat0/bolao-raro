import crypto from "crypto";

import Usuario from "./src/models/Usuario";
import Time from "./src/models/Time";
import Jogo from "./src/models/Jogo";
import Rodada from "./src/models/Rodada";
import ApostaRodada from "./src/models/ApostaRodada";
import ApostaJogo, { Palpite } from "./src/models/ApostaJogo";

import JSONApostaRodadasRepository from "./src/repositories/JSONApostaRodadasRepository";
import JSONRodadasRepository from "./src/repositories/JSONRodadasRepository";
import JSONTimesRepository from "./src/repositories/JSONTimesRepository";
import JSONUsuariosRepository from "./src/repositories/JSONUsuariosRepository";

// NOME_TIME_MANDANTE GOLS_MANDANTE x GOLS_VISITANTE NOME_TIME_VISITANTE
const usuariosRepository = new JSONUsuariosRepository();
const timesRepository = new JSONTimesRepository();
const rodadaRepository = new JSONRodadasRepository();
const apostaRodadaRepository = new JSONApostaRodadasRepository();

type Login = {
  email: string;
  senha: string;
};

function hash(senha: string): string {
  const secret = "secret_bem_incomum_da_galera_montar_tabelas";
  return crypto.createHmac("sha256", secret).update(senha).digest("hex");
}

function getRodadaByPalpites(
  usuario: Usuario,
  rodada: Rodada,
  palpites: Palpite[]
): ApostaRodada {
  // @todo implementar a construção da ApostaRodada de maneira adequada /
  // exercicios da semana 2 teve um exemplo na revisão feita na semana 3)
  return new ApostaRodada();
}

function getMensagemAposta(apostaRodada: ApostaRodada): string {
  // NOME_TIME_MANDANTE GOLS_MANDANTE x GOLS_VISITANTE NOME_TIME_VISITANTE
  // retornar conforme o formato detalhado acima, separando cada jogo com uma nova linha
  return "";
}

async function teste(login: Login, numeroRodada: number, palpites: Palpite[]) {
  // login
  const usuario = await usuariosRepository.findByEmail(login.email);

  if (usuario.getSenha() !== hash(login.senha)) {
    throw "Login invalido";
  }

  // lista os jogos de uma rodada especifica
  const rodada = await rodadaRepository.findByNumeroRodada(numeroRodada);

  // listar times para fazer join com os dados das rodadas
  const times = await timesRepository.findAll();

  // constroí objeto com as apostas do jogador.
  const apostaRodada = getRodadaByPalpites(usuario, rodada, palpites);
  await apostaRodadaRepository.save(apostaRodada);

  console.log(getMensagemAposta(apostaRodada));
}

// apostar nos jogos de um rodada especifica
const palpites: Palpite[] = Array(10).map((_, i) => ({
  jogoId: i,
  golsMandante: 2,
  golsVisitante: 1,
}));
teste({ email: "coleta@rarolabs.com.br", senha: "123456" }, 19, palpites)
  .then(() => console.log("Finalizado com sucesso"))
  .catch((error) => console.log("Ocorreu um erro", error));
