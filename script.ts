class Quarto {
    numero: number;
    tipo: string;
    disponibilidade: boolean;
  
    constructor(numero: number, tipo: string) {
      this.numero = numero;
      this.tipo = tipo;
      this.disponibilidade = true; // Inicialmente, o quarto está disponível
    }
  
    reservar() {
      if (this.disponibilidade) {
        this.disponibilidade = false;
        console.log(`Quarto ${this.numero} reservado.`);
      } else {
        console.log(`Quarto ${this.numero} não está disponível para reserva.`);
      }
    }
  
    liberar() {
      this.disponibilidade = true;
      console.log(`Quarto ${this.numero} liberado.`);
    }
   
  }

  class QuartoLuxo extends Quarto {
    constructor(numero: number) {
      super(numero, "Luxo");
    }
  }
  
  class QuartoPadrao extends Quarto {
    constructor(numero: number) {
      super(numero, "Padrão");
    }
  }
  
  // Classe para Reservas
  class Reserva {
    cliente: string;
    quarto: Quarto;
    checkIn: Date;
    checkOut: Date;
  
    constructor(cliente: string, quarto: Quarto, checkIn: Date, checkOut: Date) {
      this.cliente = cliente;
      this.quarto = quarto;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
    }
  
    calcularPrecoDiarias(): number {
      const diffInDays = Math.ceil((this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 3600 * 24));
      const precoDiaria = this.quarto instanceof QuartoLuxo ? 200 : 100;
      return diffInDays * precoDiaria;
    }
  }
  
  class Hotel {
    nome: string;
    quartos: Quarto[];
  
    constructor(nome: string, quartos: Quarto[]) {
      this.nome = nome;
      this.quartos = quartos;
    }
  
    fazerReserva(cliente: string, checkIn: Date, checkOut: Date, tipoQuarto: string): Reserva | null {
        let quartoDisponivel: Quarto | undefined = undefined;
    
        for (const quarto of this.quartos) {
            if (quarto.tipo === tipoQuarto && quarto.disponibilidade) {
                quartoDisponivel = quarto;
                break; // Encontrou um quarto disponível, pode parar o loop
            }
        }
    
        if (quartoDisponivel) {
            const reserva = new Reserva(cliente, quartoDisponivel, checkIn, checkOut);
            quartoDisponivel.reservar();
            console.log(`Reserva feita para ${cliente} no quarto ${quartoDisponivel.numero}.`);
            return reserva;
        } else {
            console.log(`Não há quartos disponíveis do tipo ${tipoQuarto} para as datas selecionadas.`);
            return null;
        }
    }
  
    verificarDisponibilidade(tipoQuarto: string) {
      const quartosDisponiveis = this.quartos.filter((quarto) => quarto.tipo === tipoQuarto && quarto.disponibilidade);
      return quartosDisponiveis.length;
    }
  }
  
  // Função para fazer reserva a partir do formulário HTML
  function fazerReserva() {
    const nomeCliente = (document.getElementById("nomeCliente") as HTMLInputElement).value;
    const tipoQuarto = (document.getElementById("tipoQuarto") as HTMLSelectElement).value;
    const checkIn = new Date((document.getElementById("checkIn") as HTMLInputElement).value);
    const checkOut = new Date((document.getElementById("checkOut") as HTMLInputElement).value);
  
    // Crie uma instância do Hotel e dos quartos aqui
    const quarto1 = new QuartoLuxo(101);
    const quarto2 = new QuartoLuxo(102);
    const quarto3 = new QuartoPadrao(201);
    const quarto4 = new QuartoPadrao(202);
  
    const hotel = new Hotel("Hotel Luxo", [quarto1, quarto2, quarto3, quarto4]);
  
    // Faça a reserva usando a lógica do Hotel
    hotel.fazerReserva(nomeCliente, checkIn, checkOut, tipoQuarto);
  
    const reservasList = document.getElementById("reservasList");
    const reservaItem = document.createElement("li");
    reservaItem.textContent = `Reserva para ${nomeCliente} (${tipoQuarto}) de ${checkIn.toDateString()} a ${checkOut.toDateString()}`;
    reservasList?.appendChild(reservaItem);
  }
  