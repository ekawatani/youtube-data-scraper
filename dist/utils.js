"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var numeral_1 = __importDefault(require("numeral"));
var iso8601_duration_1 = require("iso8601-duration");
var lodash_isstring_1 = __importDefault(require("lodash.isstring"));
var lodash_isnumber_1 = __importDefault(require("lodash.isnumber"));
exports.identity = function (value) { return value; };
exports.isNonEmptyString = function (value) { return lodash_isstring_1.default(value) && value.length > 0; };
exports.toNumber = function (value) {
    var converted = numeral_1.default(value).value();
    if (!lodash_isnumber_1.default(converted)) {
        throw new Error('The value could not be converted to a number.');
    }
    return converted;
};
exports.toNumberISO8601Seconds = function (value) {
    var converted = iso8601_duration_1.toSeconds(iso8601_duration_1.parse(value));
    if (!lodash_isnumber_1.default(converted)) {
        throw new Error('The ISO8601 value could not be converted to a number.');
    }
    return converted;
};
exports.toBoolean = function (value) {
    switch (value.trim().toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            throw new Error('The value could not be converted to a boolean.');
    }
};
