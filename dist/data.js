"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValue = function (name, parsedValue, transformer, validator) {
    if (parsedValue === undefined) {
        throw new Error("\"" + name + "\" was not found. This probably means the parser needs to be updated.");
    }
    if (parsedValue === null) {
        throw new Error(name + " was found, but the value was null. This probably means the parser needs to be updated.");
    }
    var transformedValue = transformer(parsedValue);
    if (!validator(transformedValue)) {
        throw new Error("The parsed value of \"" + name + "\" was invalid.\nParsed value: \"" + JSON.stringify(parsedValue) + "\", Transformed value: \"" + transformedValue + "\"");
    }
    return transformedValue;
};
