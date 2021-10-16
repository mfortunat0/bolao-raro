import crypto from "crypto";

import Usuario from "./src/models/Usuario";
import Time from "./src/models/Time";
import Jogo from "./src/models/Jogo";
import Rodada from "./src/models/Rodada";
import ApostaRodada from "./src/models/ApostaRodada";
import { Palpite } from "./src/models/ApostaJogo";

import JSONApostaRodadasRepository from "./src/repositories/JSONApostaRodadasRepository";
import JSONRodadasRepository from "./src/repositories/JSONRodadasRepository";
import JSONTimesRepository from "./src/repositories/JSONTimesRepository";
import JSONUsuariosRepository from "./src/repositories/JSONUsuariosRepository";

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
  return usuario.aposta(rodada, palpites);
}

function getMensagemAposta(apostaRodada: ApostaRodada): string {
  const formatted = apostaRodada
    .getApostasJogos()
    .reduce((acc, prev, index) => {
      const nameMandante = prev.getjogo().getMandante().getNome();
      const nameVisitante = prev.getjogo().getVisitante().getNome();
      const golsMandante = prev.getgolsMandante();
      const golsVisitante = prev.getgolsVisitante();
      if (index === 0) {
        return `${nameMandante} ${golsMandante} x ${golsVisitante} ${nameVisitante} \n`;
      } else {
        return (
          acc +
          `${nameMandante} ${golsMandante} x ${golsVisitante} ${nameVisitante} \n`
        );
      }
    }, "");
  return formatted;
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
