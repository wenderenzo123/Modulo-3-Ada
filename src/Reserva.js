"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
var Reserva = /** @class */ (function () {
    function Reserva(cliente, quarto, checkIn, checkOut) {
        this.cliente = cliente;
        this.quarto = quarto;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
    Reserva.prototype.periodoReserva = function () {
        return [this.checkIn, this.checkOut];
    };
    Reserva.prototype.calcularPrecoDiarias = function () {
        var diffInDays = Math.ceil((this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 3600 * 24));
        var precoDiaria = this.quarto.tipoQuarto() == "Luxo" ? 200 : 100;
        return diffInDays * precoDiaria;
    };
    Reserva.prototype.dadosReserva = function () {
        return "Reserva para ".concat(this.cliente, " (").concat(this.quarto.tipoQuarto(), ") de ").concat(this.checkIn.toDateString(), " a ").concat(this.checkOut.toDateString());
    };
    return Reserva;
}());
exports.Reserva = Reserva;
