import {
  IDate,
  IItem,
  ILink,
  IPrice,
  ISummary,
  ITextObjects,
  IThumbnail,
} from "./generalTypes";

export interface IComicResponse {
  code: number | string;
  message: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: IComic[];
  };
}

export interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: ITextObjects[] | [];
  resourceURI: string;
  urls: ILink[];
  series: IItem;
  variants: IItem[];
  collections: IItem[] | [];
  collectedIssues: IItem[] | [];
  dates: IDate[];
  prices: IPrice[];
  price: number;
  oldPrice: number;
  stock: number;
  thumbnail: IThumbnail;
  images: ILink[] | [];
  creators: ISummary;
  characters: ISummary;
  stories: ISummary;
  events: ISummary;
}
