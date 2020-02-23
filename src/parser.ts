import htmlToText from 'html-to-text';

const metaItem = (body: HTMLElement, propValue: string, attribute = 'content'): string | null | undefined => body.querySelector(`#watch7-main-container [itemprop="${propValue}"]`)?.getAttribute(attribute);

const parser = {
  channelId: (body: HTMLElement): string | null | undefined => metaItem(body, 'channelId'),

  thumbnailUrl: (body: HTMLElement): string | null | undefined => metaItem(body, 'thumbnailUrl', 'href'),

  embedUrl: (body: HTMLElement): string | null | undefined => metaItem(body, 'embedUrl', 'href'),

  isLiveBroadCast: (body: HTMLElement): string | null | undefined => metaItem(body, 'isLiveBroadcast'),

  broadcastStartDate: (body: HTMLElement): string | null | undefined => metaItem(body, 'startDate'),

  broadcastEndDate: (body: HTMLElement): string | null | undefined => metaItem(body, 'endDate'),

  unlisted: (body: HTMLElement): string | null | undefined => metaItem(body, 'unlisted'),

  isFamilyFriendly: (body: HTMLElement): string | null | undefined => metaItem(body, 'isFamilyFriendly'),

  title: (body: HTMLElement): string | null | undefined => metaItem(body, 'name'),

  description: (body: HTMLElement): string | null | undefined => {
    const descriptionHtml = body.querySelector('#eow-description')?.outerHTML;
    if (descriptionHtml === undefined) {
      return undefined;
    }

    // This is used because using textContent removes line breaks, and YouTube also truncates long URLs.
    return htmlToText.fromString(descriptionHtml, {
      wordwrap: false,
      ignoreImage: true
    });
  },

  duration: (body: HTMLElement): string | null | undefined => metaItem(body, 'duration'),

  publishedAt: (body: HTMLElement): string | null | undefined => metaItem(body, 'datePublished'),

  // Do not use the one from the meta item since its value is not localized.
  category: (body: HTMLElement): string | null | undefined => body.querySelector('#watch-description-extras li.watch-meta-item ul.watch-info-tag-list > li > a')?.textContent,

  gameTitle: (body: HTMLElement): string | null | undefined => body.querySelector('#watch-description-extras li.watch-meta-item.has-image ul.watch-info-tag-list > li')?.textContent,

  viewCount: (body: HTMLElement): string | null | undefined => metaItem(body, 'interactionCount'),

  likeCount: (body: HTMLElement): string | null | undefined => body.querySelector('.like-button-renderer-like-button-unclicked span')?.textContent,

  dislikeCount: (body: HTMLElement): string | null | undefined => body.querySelector('.like-button-renderer-dislike-button-unclicked span')?.textContent,

  sessionToken: (body: HTMLElement): string | undefined => /XSRF_TOKEN':\s*"(.+?)",/i.exec(body.innerHTML)?.pop(),

  commentsToken: (body: HTMLElement): string | undefined => /COMMENTS_TOKEN':\s*"(.+?)",/i.exec(body.innerHTML)?.pop(),

  commentsCount: (response: string): string | undefined => JSON.parse(response).response?.continuationContents?.itemSectionContinuation?.header?.commentsHeaderRenderer?.commentsCount?.simpleText,
};

export default parser;