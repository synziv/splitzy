"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const express_1 = __importDefault(require("express"));
const groupRoutes_1 = __importDefault(require("./groupRoutes"));
const itemRoutes_1 = __importDefault(require("./itemRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.default.Router();
/* GET home page. */
router.use('/auth', authRoutes_1.default);
router.use('/group', groupRoutes_1.default);
router.use('/item', itemRoutes_1.default);
router.use('/user', userRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map