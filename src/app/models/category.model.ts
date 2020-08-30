import { SubCategoryModel } from './subcategory.model';

export interface CategoryModel {
  id: number;
  name: string;
  image?: any;
  createdAt: string;
  updatedAt: string;
  SubCategories:SubCategoryModel[];
}