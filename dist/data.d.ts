export interface YouTubeVideoData {
    id: string;
    channelId: string;
    unlisted: string;
    title: string;
    description: string;
    duration: number;
    publishedAt: string;
    category: string;
    gameTitle: string;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
}
export declare const createValue: <T>(name: string, parsedValue: string | null | undefined, transformer: (value: string) => T, validator: (value: T) => boolean) => T;
