import { Reserva } from './Reserva';

export abstract class Quarto {
  private numero: number;
  protected tipo: string;
  private disponibilidade: boolean;
  private reservas: Reserva[] = [];

  constructor(numero: number) {
    this.numero = numero;
    this.disponibilidade = true;
  }

  reservar(reserva: Reserva): boolean {

    const dates = reserva.periodoReserva();

    for (let res of this.reservas) {
      let r = res.periodoReserva();
      if (r[0] <= dates[0]) {
        if (r[1] >= dates[0])
          return false;
      } else {
        if (dates[1] >= r[0])
          return false;
      }
    }

    this.reservas.push(reserva);

    if (this.reservas.length > 3)
      this.disponibilidade = false;

    return true;
  }

  liberar(): boolean {
    this.disponibilidade = true;
    console.log(`Quarto ${this.numero} liberado.`);
    return true;
  }

  numQuarto(): number {
    return this.numero;
  }
  tipoQuarto(): string {
    return this.tipo;
  }
  disponivel(): boolean {
    return this.disponibilidade;
  }

}

export class QuartoLuxo extends Quarto {
  constructor(numero: number) {
    super(numero);
    this.tipo = "Luxo";
  }
}

export class QuartoPadrao extends Quarto {
  constructor(numero: number) {
    super(numero);
    this.tipo = "Padrão";
  }
}

