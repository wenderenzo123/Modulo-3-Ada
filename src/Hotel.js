"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { QuartoLuxo, QuartoPadrao } from "./Quartos.js";
import { Reserva } from "./Reserva.js";
var Hotel = /** @class */ (function () {
    function Hotel(nome, quartos) {
        this.nome = nome;
        this.quartos = quartos;
    }
    Hotel.prototype.encontraQuarto = function (tipoQuarto) {
        var quartosDisponiveis = this.quartos.filter(function (quarto) { return quarto.tipoQuarto() === tipoQuarto && quarto.disponivel(); });
        if (quartosDisponiveis.length > 0)
            return quartosDisponiveis;
        else
            return null;
    };
    Hotel.prototype.fazerReserva = function () {
        var nomeCliente = document.getElementById("nomeCliente").value;
        var tipoQuarto = document.getElementById("tipoQuarto").value;
        var checkIn = new Date(document.getElementById("checkIn").value);
        var checkOut = new Date(document.getElementById("checkOut").value);
        var quartosDisponiveis = this.encontraQuarto(tipoQuarto);
        if (quartosDisponiveis == null) {
            alert("N\u00E3o h\u00E1 quartos dispon\u00EDveis do tipo ".concat(tipoQuarto));
            return;
        }
        var reserva;
        var reservado = false;
        for (var _i = 0, quartosDisponiveis_1 = quartosDisponiveis; _i < quartosDisponiveis_1.length; _i++) {
            var quarto = quartosDisponiveis_1[_i];
            reserva = new Reserva_1.Reserva(nomeCliente, quarto, checkIn, checkOut);
            reservado = quarto.reservar(reserva);
            if (reservado)
                break;
        }
        if (!reservado || reserva == undefined) {
            alert("N\u00E3o h\u00E1 quartos dispon\u00EDveis do tipo ".concat(tipoQuarto, " para as datas selecionadas"));
            return;
        }
        var reservasList = document.getElementById("reservasList");
        var reservaItem = document.createElement("li");
        reservaItem.textContent = reserva.dadosReserva();
        reservasList === null || reservasList === void 0 ? void 0 : reservasList.appendChild(reservaItem);
    };
    return Hotel;
}());
// Crie uma instância do Hotel e dos quartos aqui
var quarto1 = new Quartos_1.QuartoLuxo(101);
var quarto2 = new Quartos_1.QuartoLuxo(102);
var quarto3 = new Quartos_1.QuartoPadrao(201);
var quarto4 = new Quartos_1.QuartoPadrao(202);
var hotel = new Hotel("Hotel Luxo", [quarto1, quarto2, quarto3, quarto4]);
var button = document.getElementById("botaoReserva");
if (button !== null) {
    button.onclick = function () {
        hotel.fazerReserva();
    };
}
