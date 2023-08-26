type ArticleSummary = {
    path: string,
    title: string,
    created_at: string,
    modified_at: string,
};

export type Article = {
    url: string,
    title: string,
    body: string,
    modified_at: string,
    tags: string[],
};

type IndexPage = string;

export type PageIndexJson = {
    articles: ArticleSummary[],
    indexes: IndexPage[],
};