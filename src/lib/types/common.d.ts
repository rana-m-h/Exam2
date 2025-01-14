declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type BaseParams = {
  params: { locale: "en" | "ar" };
  searchParams: SearchParams;
};

declare type Translations<T> = {
  language: "ar" | "en";
  data: T;
};
