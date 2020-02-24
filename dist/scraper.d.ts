import { CookieJar } from 'tough-cookie';
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
export declare const getVideo: (id: string, options?: GetVideoOptions | undefined) => Promise<YouTubeVideoData>;
export {};
