"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.use('/auth', authRoutes_1.default);
router.get('/x', (req, res) => { res.send('holaaaaaaaaaa'); });
exports.default = router;
//# sourceMappingURL=index.js.map