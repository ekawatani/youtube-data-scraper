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
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var jsdom_1 = require("jsdom");
var request_1 = __importDefault(require("./request"));
var parser_1 = __importDefault(require("./parser"));
var value_1 = require("./value");
var urls_1 = require("./urls");
var utils_1 = require("./utils");
exports.getVideo = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    var cookieJar, pageContent, body, commentData;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                cookieJar = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.cookieJar, (_b !== null && _b !== void 0 ? _b : request_promise_native_1.default.jar()));
                return [4 /*yield*/, request_1.default({
                        url: urls_1.videoUrl,
                        method: 'GET',
                        cookieJar: cookieJar,
                        queries: {
                            v: id,
                        },
                        headers: {
                            'Accept-Language': (_c = options) === null || _c === void 0 ? void 0 : _c.language,
                            'Connection': 'keep-alive',
                            'Cache-Control': 'max-age=0',
                        },
                    })];
            case 1:
                pageContent = _d.sent();
                body = new jsdom_1.JSDOM(pageContent).window.document.body;
                return [4 /*yield*/, request_1.default({
                        url: urls_1.commentServiceUrl,
                        method: 'POST',
                        cookieJar: cookieJar,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Cache-Control': 'no-cache',
                            'x-youtube-client-name': '1',
                            'x-youtube-client-version': '2.20190221',
                        },
                        queries: {
                            action_get_comments: '1',
                            pbj: '1',
                            ctoken: value_1.createValue('commentsToken', parser_1.default.commentsToken(body), utils_1.identity, utils_1.isNonEmptyString),
                        },
                        formData: {
                            session_token: value_1.createValue('sessionToken', parser_1.default.sessionToken(body), utils_1.identity, utils_1.isNonEmptyString),
                        },
                    })];
            case 2:
                commentData = _d.sent();
                return [2 /*return*/, {
                        id: id,
                        channelId: value_1.createValue('channelId', parser_1.default.channelId(body), utils_1.identity, utils_1.isNonEmptyString),
                        thumbnailUrl: value_1.createValue('thumbnailUrl', parser_1.default.thumbnailUrl(body), utils_1.identity, utils_1.isNonEmptyString),
                        embedUrl: value_1.createValue('embedUrl', parser_1.default.thumbnailUrl(body), utils_1.identity, utils_1.isNonEmptyString),
                        liveBroadcast: value_1.createOptionalValue('isLiveBroadCast', parser_1.default.isLiveBroadCast(body), utils_1.toBoolean) ? {
                            startDate: value_1.createValue('broadcastStartDate', parser_1.default.broadcastStartDate(body), utils_1.identity, utils_1.isNonEmptyString),
                            endDate: value_1.createValue('broadcastEndDate', parser_1.default.broadcastStartDate(body), utils_1.identity, utils_1.isNonEmptyString),
                        } : undefined,
                        unlisted: value_1.createValue('unlisted', parser_1.default.unlisted(body), utils_1.toBoolean),
                        isFamilyFriendly: value_1.createValue('isFamilyFriendly', parser_1.default.isFamilyFriendly(body), utils_1.toBoolean),
                        title: value_1.createValue('title', parser_1.default.title(body), utils_1.identity, utils_1.isNonEmptyString),
                        description: value_1.createValue('description', parser_1.default.description(body), utils_1.identity),
                        duration: value_1.createValue('duration', parser_1.default.duration(body), utils_1.toNumberISO8601Seconds),
                        publishedAt: value_1.createValue('publishedAt', parser_1.default.publishedAt(body), utils_1.identity, utils_1.isNonEmptyString),
                        category: value_1.createValue('category', parser_1.default.category(body), utils_1.identity, utils_1.isNonEmptyString),
                        gameTitle: value_1.createOptionalValue('gameTitle', parser_1.default.gameTitle(body), utils_1.identity, utils_1.isNonEmptyString),
                        viewCount: value_1.createValue('viewCount', parser_1.default.viewCount(body), utils_1.toNumber),
                        likeCount: value_1.createValue('likeCount', parser_1.default.likeCount(body), utils_1.toNumber),
                        dislikeCount: value_1.createValue('dislikeCount', parser_1.default.dislikeCount(body), utils_1.toNumber),
                        commentCount: value_1.createValue('commentCount', parser_1.default.commentsCount(commentData), utils_1.toNumber),
                    }];
        }
    });
}); };
