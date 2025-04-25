export interface IMessage {
    role: string;
    content: string;
}

export interface ISystemPrompts{
    [key: string]: {
        ja: string;
        en: string;
    }
}