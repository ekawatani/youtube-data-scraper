import { CookieJar } from 'tough-cookie';
import { JSDOM } from 'jsdom';
import request from './request';
import parser from './parser';
import { createValue, createOptionalValue } from './value';
import { videoUrl, commentServiceUrl } from './urls';
import { identity as _, isNonEmptyString, toNumber, toNumberISO8601Seconds, toBoolean } from './utils';

export interface YouTubeVideoData {
  id: string;
  channelId: string;
  thumbnailUrl: string;
  embedUrl: string;
  liveBroadcast?: {
    startDate: string;
    endDate: string;
  };
  unlisted: boolean;
  isFamilyFriendly: boolean;
  title: string;
  description?: string;
  duration: number;
  publishedAt: string;
  category: string;
  gameTitle?: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount?: number;
}

interface GetVideoOptions {
  language?: string;
  cookieJar?: CookieJar;
}

export const getVideo = async (id: string, options?: GetVideoOptions): Promise<YouTubeVideoData> => {
  const cookieJar = options?.cookieJar ?? new CookieJar();

  const pageContent = await request(videoUrl, {
    method: 'GET',
    cookieJar,
    queries: {
      v: id,
    },
    headers: {
      'Accept-Language': options?.language || 'en-US',
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
    },
  });

  const body = new JSDOM(pageContent).window.document.body;

  // Videos that disable comments do not have comments token in the response.
  const commentToken = createOptionalValue<string>('commentsToken', parser.commentsToken(body), _, isNonEmptyString);
  const commentData = isNonEmptyString(commentToken)
    ? await request(commentServiceUrl, {
        method: 'POST',
        cookieJar,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'x-youtube-client-name': '1',
          'x-youtube-client-version': '2.20190221',
        },
        queries: {
          action_get_comments: '1', // eslint-disable-line
          pbj: '1',
          ctoken: commentToken,
        },
        formData: {
          session_token: createValue<string>('sessionToken', parser.sessionToken(body), _, isNonEmptyString), // eslint-disable-line
        },
      })
    : undefined;

  return {
    id,
    channelId: createValue<string>('channelId', parser.channelId(body), _, isNonEmptyString),
    thumbnailUrl: createValue<string>('thumbnailUrl', parser.thumbnailUrl(body), _, isNonEmptyString),
    embedUrl: createValue<string>('embedUrl', parser.thumbnailUrl(body), _, isNonEmptyString),
    liveBroadcast: createOptionalValue<boolean>('isLiveBroadCast', parser.isLiveBroadCast(body), toBoolean)
      ? {
          startDate: createValue<string>('broadcastStartDate', parser.broadcastStartDate(body), _, isNonEmptyString),
          endDate: createValue<string>('broadcastEndDate', parser.broadcastStartDate(body), _, isNonEmptyString),
        }
      : undefined,
    unlisted: createValue<boolean>('unlisted', parser.unlisted(body), toBoolean),
    isFamilyFriendly: createValue<boolean>('isFamilyFriendly', parser.isFamilyFriendly(body), toBoolean),
    title: createValue<string>('title', parser.title(body), _, isNonEmptyString),
    description: createValue<string>('description', parser.description(body), _),
    duration: createValue<number>('duration', parser.duration(body), toNumberISO8601Seconds),
    publishedAt: createValue<string>('publishedAt', parser.publishedAt(body), _, isNonEmptyString),
    category: createValue<string>('category', parser.category(body), _, isNonEmptyString),
    gameTitle: createOptionalValue<string>('gameTitle', parser.gameTitle(body), _, isNonEmptyString),
    viewCount: createValue<number>('viewCount', parser.viewCount(body), toNumber),
    likeCount: createValue<number>('likeCount', parser.likeCount(body), toNumber),
    dislikeCount: createValue<number>('dislikeCount', parser.dislikeCount(body), toNumber),
    commentCount: commentData === undefined
      ? undefined
      : createValue<number>('commentCount', parser.commentsCount(commentData), toNumber),
  };
};