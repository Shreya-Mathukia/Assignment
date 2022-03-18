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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var ScheduleController = /** @class */ (function () {
    function ScheduleController(scheduleService) {
        var _this = this;
        this.scheduleService = scheduleService;
        this.decodeToken = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization;
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            req.body.Zipcode = user.Zipcode;
                            req.body.Email = user.Email;
                            return _this.scheduleService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.RoleId) == '3') {
                                    next();
                                }
                                else {
                                    return res.status(400).json("You are not customer, try to login using customer account!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("Token not exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.createService = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var max;
            var _this = this;
            return __generator(this, function (_a) {
                req.body.ServiceHourlyRate = 20;
                req.body.Discount = 5;
                req.body.ExtraHours = req.body.ExtraService * 0.5;
                req.body.Subtotal = req.body.ServiceHourlyRate * (req.body.ServiceHours + req.body.ExtraHours);
                req.body.TotalCost = req.body.Subtotal - (req.body.Subtotal * 0.05);
                max = 20000;
                req.body.ServiceId = Math.floor(Math.random() * max) + 1;
                return [2 /*return*/, this.scheduleService
                        .findByEmail(req.body.Email)
                        .then(function (user) {
                        if (user) {
                            if (user.RoleId == '3') {
                                req.body.UserId = user.id;
                                req.body.ModifiedBy = user.id;
                            }
                            else {
                                return res.status(404).json("You are not a Customer!");
                            }
                        }
                        else {
                            return res.status(404).json("No user exists with this email!");
                        }
                        return _this.scheduleService
                            .scheduleService(req.body)
                            .then(function (service) {
                            var Email = req.body.Email;
                            var Zipcode = req.body.Zipcode;
                            var ServiceRequestId = service.ServiceRequestId;
                            var token = _this.scheduleService.generateToken(Email, Zipcode, ServiceRequestId);
                            return res.status(200).cookie("token", token, { httpOnly: true }).json("Your Servie Schedule Successful.");
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ error: error, Message: "Request Failed." });
                        });
                    })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.scheduleService = scheduleService;
    }
    return ScheduleController;
}());
exports.ScheduleController = ScheduleController;
