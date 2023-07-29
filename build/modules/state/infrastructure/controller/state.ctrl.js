var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class StateController {
    constructor(stateService) {
        this.stateService = stateService;
        this.getStates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const states = yield this.stateService.getStates();
            res.send(states);
        });
        this.insertStatesAndCities = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const insertedStates = this.stateService.insertStatesAndCities();
            res.send(insertedStates);
        });
        this.getCities = ({ params }, res) => __awaiter(this, void 0, void 0, function* () {
            const { state } = params;
            const cities = yield this.stateService.getCities(state);
            res.send(cities);
        });
    }
}
