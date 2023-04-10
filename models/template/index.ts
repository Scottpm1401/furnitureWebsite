export type TemplateType = {
  _id: string;
  banners: BannerType[];
  about: BannerType;
  home_footer: ContentType[];
  contact: ContentType[];
  terms_and_conditions: ContentType[];
  privacy_policy: ContentType[];
  active: boolean;
  title: string;
};

export type BannerType = {
  _id: string;
  image: string;
  title: ContentType[];
  description: ContentType[];
};

export type ContentType = {
  _id: string;
  lang: Language;
  content: string;
};

export enum Language {
  vietnam = 'vi',
  english = 'en',
}
