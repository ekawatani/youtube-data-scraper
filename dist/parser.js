"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_to_text_1 = __importDefault(require("html-to-text"));
var metaItem = function (body, propValue, attribute) {
    if (attribute === void 0) { attribute = 'content'; }
    var _a;
    return (_a = body.querySelector("#watch7-main-container [itemprop=\"" + propValue + "\"]")) === null || _a === void 0 ? void 0 : _a.getAttribute(attribute);
};
var parser = {
    channelId: function (body) { return metaItem(body, 'channelId'); },
    thumbnailUrl: function (body) { return metaItem(body, 'thumbnailUrl', 'href'); },
    embedUrl: function (body) { return metaItem(body, 'embedUrl', 'href'); },
    isLiveBroadCast: function (body) { return metaItem(body, 'isLiveBroadcast'); },
    broadcastStartDate: function (body) { return metaItem(body, 'startDate'); },
    broadcastEndDate: function (body) { return metaItem(body, 'endDate'); },
    unlisted: function (body) { return metaItem(body, 'unlisted'); },
    isFamilyFriendly: function (body) { return metaItem(body, 'isFamilyFriendly'); },
    title: function (body) { return metaItem(body, 'name'); },
    description: function (body) {
        var _a;
        var descriptionHtml = (_a = body.querySelector('#eow-description')) === null || _a === void 0 ? void 0 : _a.outerHTML;
        if (descriptionHtml === undefined) {
            return undefined;
        }
        // This is used because using textContent removes line breaks, and YouTube also truncates long URLs.
        return html_to_text_1.default.fromString(descriptionHtml, {
            wordwrap: false,
            ignoreImage: true
        });
    },
    duration: function (body) { return metaItem(body, 'duration'); },
    publishedAt: function (body) { return metaItem(body, 'datePublished'); },
    // Do not use the one from the meta item since its value is not localized.
    category: function (body) { var _a; return (_a = body.querySelector('#watch-description-extras li.watch-meta-item ul.watch-info-tag-list > li > a')) === null || _a === void 0 ? void 0 : _a.textContent; },
    gameTitle: function (body) { var _a; return (_a = body.querySelector('#watch-description-extras li.watch-meta-item.has-image ul.watch-info-tag-list > li')) === null || _a === void 0 ? void 0 : _a.textContent; },
    viewCount: function (body) { return metaItem(body, 'interactionCount'); },
    likeCount: function (body) { var _a; return (_a = body.querySelector('.like-button-renderer-like-button-unclicked span')) === null || _a === void 0 ? void 0 : _a.textContent; },
    dislikeCount: function (body) { var _a; return (_a = body.querySelector('.like-button-renderer-dislike-button-unclicked span')) === null || _a === void 0 ? void 0 : _a.textContent; },
    sessionToken: function (body) { var _a; return (_a = /XSRF_TOKEN':\s*"(.+?)",/i.exec(body.innerHTML)) === null || _a === void 0 ? void 0 : _a.pop(); },
    commentsToken: function (body) { var _a; return (_a = /COMMENTS_TOKEN':\s*"(.+?)",/i.exec(body.innerHTML)) === null || _a === void 0 ? void 0 : _a.pop(); },
    commentsCount: function (response) { var _a, _b, _c, _d, _e, _f; return (_f = (_e = (_d = (_c = (_b = (_a = JSON.parse(response).response) === null || _a === void 0 ? void 0 : _a.continuationContents) === null || _b === void 0 ? void 0 : _b.itemSectionContinuation) === null || _c === void 0 ? void 0 : _c.header) === null || _d === void 0 ? void 0 : _d.commentsHeaderRenderer) === null || _e === void 0 ? void 0 : _e.commentsCount) === null || _f === void 0 ? void 0 : _f.simpleText; },
};
exports.default = parser;
