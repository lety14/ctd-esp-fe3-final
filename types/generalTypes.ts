export interface ISummary {
  available: number;
  collectionURI: string;
  items: IItem[] | [];
  returned: number;
}

export interface IItem {
  resourceURI: string;
  name: string;
  type?: "cover" | "interiorStory" | "promo" | string;
  role?:
    | "editor"
    | "writer"
    | "penciller"
    | "penciller (cover)"
    | "colorist"
    | "inker"
    | "penciller (cover) "
    | "letterer"
    | string;
}

export interface ILink {
  type: "detail" | "comiclink" | "purchase" | string;
  url: string;
}

export interface IDate {
  type: "onsaleDate" | "focDate" | string;
  date: string;
}

export interface IDate {
  type: "onsaleDate" | "focDate" | string;
  date: string;
}

export interface IPrice {
  type: "printPrice" | string;
  price: number;
}

export interface IThumbnail {
  path: string;
  extension: "jpg" | string;
}

export interface ITextObjects {
  type: "issue_solicit_text" | string;
  language: "en-us" | string;
  text: string;
}
