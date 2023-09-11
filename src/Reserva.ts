import { Quarto } from './Quartos';

export class Reserva {

  private cliente: string;
  private quarto: Quarto;
  private checkIn: Date;
  private checkOut: Date;

  constructor(cliente: string, quarto: Quarto, checkIn: Date, checkOut: Date) {
    this.cliente = cliente;
    this.quarto = quarto;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }

  periodoReserva(): Date[] {
    return [this.checkIn, this.checkOut];
  }

  calcularPrecoDiarias(): number {
    const diffInDays = Math.ceil((this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 3600 * 24));
    const precoDiaria = this.quarto.tipoQuarto() == "Luxo" ? 200 : 100;
    return diffInDays * precoDiaria;
  }

  dadosReserva(): string {
    return `Reserva para ${this.cliente} (${this.quarto.tipoQuarto()}) de ${this.checkIn.toDateString()} a ${this.checkOut.toDateString()}`;
  }

}
