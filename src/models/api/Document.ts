import { Faq } from "./Faq";

export interface Document {
  type?: string;
  faq?: Faq;
  externalUrl?: string | "";
}
