import Jogo from "./Jogo";
import Rodada from "./Rodada";
import Time from "./Time";

export default abstract class Calendario {
  public static geraCalendarioCampeonato(
    times: Time[],
    dataPrimeiroJogo: Date
  ): Rodada[] {
    const arrTimes1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arrTimes2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const rodadas: Rodada[] = [];
    const dataAtual: Date = new Date(dataPrimeiroJogo);

    for (let i = 1; i < 39; i++) {
      const rodada = new Rodada(i);
      if (i < 20) {
        for (let j = 0; j < arrTimes1.length; j++) {
          const mandante: Time = times.find(
            (time) => time.getId() === arrTimes1[j]
          );
          const visitante: Time = times.find(
            (time) => time.getId() === arrTimes2[j]
          );
          const jogo: Jogo = new Jogo(mandante, visitante, dataAtual);
          rodada.addJogo(jogo);
        }
      } else {
        for (let j = 0; j < arrTimes1.length; j++) {
          const mandante: Time = times.find(
            (time) => time.getId() === arrTimes1[j]
          );
          const visitante: Time = times.find(
            (time) => time.getId() === arrTimes2[j]
          );
          const jogo: Jogo = new Jogo(mandante, visitante, dataAtual);
          rodada.addJogo(jogo);
        }
      }

      const valueIdtemp1: number = arrTimes1.pop();
      const valueIdtemp2: number = arrTimes2.shift();
      arrTimes2.push(valueIdtemp1);
      arrTimes1.splice(1, 0, valueIdtemp2);
      rodadas.push(rodada);
      if (dataAtual.getDay() === 0) {
        dataAtual.setDate(dataAtual.getDate() + 3);
        dataAtual.setHours(21, 30);
      } else if (dataAtual.getDay() === 3) {
        dataAtual.setDate(dataAtual.getDate() + 4);
        dataAtual.setHours(16, 0);
      }
    }
    return rodadas;
  }
}
