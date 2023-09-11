import { Quarto, QuartoLuxo, QuartoPadrao } from './Quartos'
import { Reserva } from './Reserva'

class Hotel {
  private nome: string;
  private quartos: Quarto[];

  constructor(nome: string, quartos: Quarto[]) {
    this.nome = nome;
    this.quartos = quartos;
  }

  encontraQuarto(tipoQuarto: string): Quarto[] | null {
    const quartosDisponiveis = this.quartos.filter((quarto) => quarto.tipoQuarto() === tipoQuarto && quarto.disponivel());
    if (quartosDisponiveis.length > 0)
      return quartosDisponiveis;
    else
      return null;
  }

  fazerReserva(): void {

    const nomeCliente = (document.getElementById("nomeCliente") as HTMLInputElement).value;
    const tipoQuarto = (document.getElementById("tipoQuarto") as HTMLSelectElement).value;
    const checkIn = new Date((document.getElementById("checkIn") as HTMLInputElement).value);
    const checkOut = new Date((document.getElementById("checkOut") as HTMLInputElement).value);

    let quartosDisponiveis = this.encontraQuarto(tipoQuarto);
    if (quartosDisponiveis == null) {
      alert(`Não há quartos disponíveis do tipo ${tipoQuarto}`);
      return
    }

    let reserva: Reserva | undefined;
    let reservado: boolean = false;

    for (let quarto of quartosDisponiveis) {
      reserva = new Reserva(nomeCliente, quarto, checkIn, checkOut);
      reservado = quarto.reservar(reserva);
      if (reservado)
        break;
    }

    if (!reservado || reserva == undefined) {
      alert(`Não há quartos disponíveis do tipo ${tipoQuarto} para as datas selecionadas`);
      return;
    }

    const reservasList = document.getElementById("reservasList");
    const reservaItem = document.createElement("li");
    reservaItem.textContent = reserva.dadosReserva();
    reservasList?.appendChild(reservaItem);

  }

}

// Crie uma instância do Hotel e dos quartos aqui
const quarto1 = new QuartoLuxo(101);
const quarto2 = new QuartoLuxo(102);
const quarto3 = new QuartoPadrao(201);
const quarto4 = new QuartoPadrao(202);
const hotel = new Hotel("Hotel Luxo", [quarto1, quarto2, quarto3, quarto4]);
const button = document.getElementById("botaoReserva");
if (button !== null) {
  button.onclick = function() {
   hotel.fazerReserva();
  };
}
