export interface IMessage {
  role: string;
  content: string;
}

export interface ISystemPrompts {
  [key: number]: {
    ja: string;
    en: string;
  };
}
