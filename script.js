var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Classe base para Quartos
debugger;
var Quarto = /** @class */ (function () {
    function Quarto(numero, tipo) {
        this.numero = numero;
        this.tipo = tipo;
        this.disponibilidade = true; // Inicialmente, o quarto está disponível
    }
    Quarto.prototype.reservar = function () {
        if (this.disponibilidade) {
            this.disponibilidade = false;
            console.log("Quarto ".concat(this.numero, " reservado."));
        }
        else {
            console.log("Quarto ".concat(this.numero, " n\u00E3o est\u00E1 dispon\u00EDvel para reserva."));
        }
    };
    Quarto.prototype.liberar = function () {
        this.disponibilidade = true;
        console.log("Quarto ".concat(this.numero, " liberado."));
    };
    return Quarto;
}());
// Classe para Quartos de Luxo que herda de Quarto
var QuartoLuxo = /** @class */ (function (_super) {
    __extends(QuartoLuxo, _super);
    function QuartoLuxo(numero) {
        return _super.call(this, numero, "Luxo") || this;
    }
    return QuartoLuxo;
}(Quarto));
// Classe para Quartos Padrão que herda de Quarto
var QuartoPadrao = /** @class */ (function (_super) {
    __extends(QuartoPadrao, _super);
    function QuartoPadrao(numero) {
        return _super.call(this, numero, "Padrão") || this;
    }
    return QuartoPadrao;
}(Quarto));
// Classe para Reservas
var Reserva = /** @class */ (function () {
    function Reserva(cliente, quarto, checkIn, checkOut) {
        this.cliente = cliente;
        this.quarto = quarto;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
    Reserva.prototype.calcularPrecoDiarias = function () {
        var diffInDays = Math.ceil((this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 3600 * 24));
        var precoDiaria = this.quarto instanceof QuartoLuxo ? 200 : 100; // Preço diferente para quartos de luxo
        return diffInDays * precoDiaria;
    };
    return Reserva;
}());
// Classe para o Hotel
var Hotel = /** @class */ (function () {
    function Hotel(nome, quartos) {
        this.nome = nome;
        this.quartos = quartos;
    }
    Hotel.prototype.fazerReserva = function (cliente, checkIn, checkOut, tipoQuarto) {
        var quartoDisponivel = undefined;
        for (var _i = 0, _a = this.quartos; _i < _a.length; _i++) {
            var quarto = _a[_i];
            if (quarto.tipo === tipoQuarto && quarto.disponibilidade) {
                quartoDisponivel = quarto;
                break; // Encontrou um quarto disponível, pode parar o loop
            }
        }
        if (quartoDisponivel) {
            var reserva = new Reserva(cliente, quartoDisponivel, checkIn, checkOut);
            quartoDisponivel.reservar();
            console.log("Reserva feita para ".concat(cliente, " no quarto ").concat(quartoDisponivel.numero, "."));
            return reserva;
        }
        else {
            console.log("N\u00E3o h\u00E1 quartos dispon\u00EDveis do tipo ".concat(tipoQuarto, " para as datas selecionadas."));
            return null;
        }
    };
    Hotel.prototype.verificarDisponibilidade = function (tipoQuarto) {
        var quartosDisponiveis = this.quartos.filter(function (quarto) { return quarto.tipo === tipoQuarto && quarto.disponibilidade; });
        return quartosDisponiveis.length;
    };
    return Hotel;
}());

function mostraReserva() {
    var container = document.getElementById("reserva-conf");
    var nome = document.getElementById("nomeCli");
    var quartoEscolhido = document.getElementById("quartoEscolhido");
    var data = document.getElementById("datas");

    container.style.visibility = 'visible';
    nome.innerHTML = nomeCliente.value;
    quartoEscolhido.innerHTML = tipoQuarto.value;
    data.innerHTML = checkIn.value.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1') + ' até ' + checkOut.value.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')

}

// Função para fazer reserva a partir do formulário HTML
function fazerReserva() {
    var nomeCliente = document.getElementById("nomeCliente").value;
    var tipoQuarto = document.getElementById("tipoQuarto").value;
    var checkIn = new Date(document.getElementById("checkIn").value);
    var checkOut = new Date(document.getElementById("checkOut").value);
    var btn = document.querySelector("button")

    btn.addEventListener('click', mostraReserva);

    // Crie uma instância do Hotel e dos quartos aqui
    var quarto1 = new QuartoLuxo(101);
    var quarto2 = new QuartoLuxo(102);
    var quarto3 = new QuartoPadrao(201);
    var quarto4 = new QuartoPadrao(202);
    var hotel = new Hotel("Hotel Luxo", [quarto1, quarto2, quarto3, quarto4]);
    // Faça a reserva usando a lógica do Hotel
    hotel.fazerReserva(nomeCliente, checkIn, checkOut, tipoQuarto);
    // Atualize a lista de reservas no HTML
    var reservasList = document.getElementById("reservasList");
    var reservaItem = document.createElement("li");
    reservaItem.textContent = "Reserva para ".concat(nomeCliente, " (").concat(tipoQuarto, ") de ").concat(checkIn.toDateString(), " a ").concat(checkOut.toDateString());
    reservasList === null || reservasList === void 0 ? void 0 : reservasList.appendChild(reservaItem);
}
