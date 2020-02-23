"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createValueCore = function (name, parsedValue, transformer, validator) {
    if (parsedValue === null) {
        throw new Error(name + " was found, but the value was null. This probably means the parser needs to be updated.");
    }
    var value;
    try {
        value = transformer(parsedValue);
    }
    catch (_a) {
        throw new Error("The parsed value \"" + name + "\" could not be transformed. Value: \"" + JSON.stringify(parsedValue) + "\"");
    }
    if (validator != null && !validator(value)) {
        throw new Error("The transformed value \"" + name + "\" was invalid. Value: \"" + value + "\"");
    }
    return value;
};
exports.createValue = function (name, parsedValue, transformer, validator) {
    if (parsedValue === undefined) {
        throw new Error("\"" + name + "\" was not found. This probably means the parser needs to be updated.");
    }
    return createValueCore(name, parsedValue, transformer, validator);
};
exports.createOptionalValue = function (name, parsedValue, transformer, validator) {
    if (parsedValue === undefined) {
        return parsedValue;
    }
    return createValueCore(name, parsedValue, transformer, validator);
};
