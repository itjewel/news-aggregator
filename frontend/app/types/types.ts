// types.ts

export interface Article {
    id: string | number;
    title: string;
    content: string;
    source?: string;
    category?: string;
    created_at?: string;
    published_at?: string;
  }
  