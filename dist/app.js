"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const notFoundRoute_1 = __importDefault(require("./middlewares/notFoundRoute"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
// application routes
exports.app.use('/api', routes_1.default);
exports.app.get('/', (req, res) => {
    res.send('Sportify Server is running');
});
// not found route
exports.app.use(notFoundRoute_1.default);
// error handling for whole project
exports.app.use(globalErrorHandler_1.default);
