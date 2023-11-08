type ArticleSummary = {
    path: string,
    title: string,
    created_at: number,
    modified_at: number,
};

export type Article = {
    url: string,
    title: string,
    body: string,
    created_at: number,
    modified_at: number,
    tags: string[],
};

export type ArticleWithMetadata = {
    article: Article,
    prev_path: string,
    next_path: string
};

type IndexPage = string;

export type PageIndexJson = {
    articles: ArticleSummary[],
    indexes: IndexPage[],
};
