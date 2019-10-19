import { Faq } from "./Faq";

export interface Document {
  type?: string;
  faq?: Faq;
  categories?: [
    {
      id?: string;
    }
  ];
  externalUrl?: string;
}
