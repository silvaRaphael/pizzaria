"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function populateStateTable() {
    return __awaiter(this, void 0, void 0, function () {
        var stateCount, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, prisma.state.count()];
                case 1:
                    stateCount = _a.sent();
                    if (stateCount)
                        return [2 /*return*/];
                    return [4 /*yield*/, prisma.state.createMany({
                            data: [
                                { id: '12', state: 'Acre', abbr: 'AC' },
                                { id: '27', state: 'Alagoas', abbr: 'AL' },
                                { id: '16', state: 'Amapá', abbr: 'AP' },
                                { id: '13', state: 'Amazonas', abbr: 'AM' },
                                { id: '29', state: 'Bahia', abbr: 'BA' },
                                { id: '23', state: 'Ceará', abbr: 'CE' },
                                { id: '53', state: 'Distrito Federal', abbr: 'DF' },
                                { id: '32', state: 'Espírito Santo', abbr: 'ES' },
                                { id: '52', state: 'Goiás', abbr: 'GO' },
                                { id: '21', state: 'Maranhão', abbr: 'MA' },
                                { id: '51', state: 'Mato Grosso', abbr: 'MT' },
                                { id: '50', state: 'Mato Grosso do Sul', abbr: 'MS' },
                                { id: '31', state: 'Minas Gerais', abbr: 'MG' },
                                { id: '15', state: 'Pará', abbr: 'PA' },
                                { id: '25', state: 'Paraíba', abbr: 'PB' },
                                { id: '41', state: 'Paraná', abbr: 'PR' },
                                { id: '26', state: 'Pernambuco', abbr: 'PE' },
                                { id: '22', state: 'Piauí', abbr: 'PI' },
                                { id: '33', state: 'Rio de Janeiro', abbr: 'RJ' },
                                { id: '24', state: 'Rio Grande do Norte', abbr: 'RN' },
                                { id: '43', state: 'Rio Grande do Sul', abbr: 'RS' },
                                { id: '11', state: 'Rondônia', abbr: 'RO' },
                                { id: '14', state: 'Roraima', abbr: 'RR' },
                                { id: '42', state: 'Santa Catarina', abbr: 'SC' },
                                { id: '35', state: 'São Paulo', abbr: 'SP' },
                                { id: '28', state: 'Sergipe', abbr: 'SE' },
                                { id: '17', state: 'Tocantins', abbr: 'TO' },
                            ],
                        })];
                case 2:
                    _a.sent();
                    console.log('State populated!');
                    return [3 /*break*/, 6];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
populateStateTable();
