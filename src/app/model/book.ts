import {Category} from './category';
import {Promotion} from './promotion';

export interface Book {
  id?: number;
  bookCode?: string;
  nameBook?: string;
  images?: string;
  publishingCompany?: string;
  translator?: string;
  author?: string;
  numberPages?: number;
  size?: string;
  releaseDate?: Date;
  amount?: number;
  price?: number;
  isDelete?: boolean;
  category?: Category;
  promotion?: Promotion;
}
