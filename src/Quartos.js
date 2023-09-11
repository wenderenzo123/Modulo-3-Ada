"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoPadrao = exports.QuartoLuxo = exports.Quarto = void 0;
var Quarto = /** @class */ (function () {
    function Quarto(numero) {
        this.numero = numero;
        this.disponibilidade = true;
    }
    Quarto.prototype.reservar = function (reserva) {
        for (var _i = 0, _a = this.reservas; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r[0] < reserva[0]) {
                if (r[1] > reserva[0])
                    return false;
            }
            else {
                if (reserva[1] > r[0])
                    return false;
            }
        }
        if (this.reservas.length > 3)
            this.disponibilidade = false;
        return true;
    };
    Quarto.prototype.liberar = function () {
        this.disponibilidade = true;
        console.log("Quarto ".concat(this.numero, " liberado."));
        return true;
    };
    Quarto.prototype.numQuarto = function () {
        return this.numero;
    };
    Quarto.prototype.tipoQuarto = function () {
        return this.tipo;
    };
    Quarto.prototype.disponivel = function () {
        return this.disponibilidade;
    };
    return Quarto;
}());
exports.Quarto = Quarto;
var QuartoLuxo = /** @class */ (function (_super) {
    __extends(QuartoLuxo, _super);
    function QuartoLuxo(numero) {
        var _this = _super.call(this, numero) || this;
        _this.tipo = "Luxo";
        return _this;
    }
    return QuartoLuxo;
}(Quarto));
exports.QuartoLuxo = QuartoLuxo;
var QuartoPadrao = /** @class */ (function (_super) {
    __extends(QuartoPadrao, _super);
    function QuartoPadrao(numero) {
        var _this = _super.call(this, numero) || this;
        _this.tipo = "Padrão";
        return _this;
    }
    return QuartoPadrao;
}(Quarto));
exports.QuartoPadrao = QuartoPadrao;
