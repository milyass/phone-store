export interface Category {
  id?: number;
  name: string;
  href: string;
}

export interface SubCategory {
  id?: number;
  name: string;
  href: string;
  category?:number,
  categoryId?: number;
}

export interface Specification {
  id?: number;
  key: string;
  value: string;
  productId?: number;
}

export interface Product {
  id?: number;
  name: string;
  url: string;
  image: string;
  brand: string;
  delivery: string;
  price: string;
  availability: string;
  subcategoryId?: number;
  specifications: Specification[];
}
