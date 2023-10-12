import * as productRepository from '../repositories/productRepository';
import * as categoryRepository from '../repositories/categoryRepository';
import * as subcategoryRepository from '../repositories/subcategoryRepository';
import { 
  getCategoriesFromJumia, 
  getSubCategoriesFromJumia, 
  getProductsFromJumia, 
} from '@/utils/index'


export async function scrapFromJumiaAndAddToDatabase() {
    /**
     * get categories and insert
     */
    const found_categories = await getCategoriesFromJumia()
    const categories = await categoryRepository.addCategories(found_categories)
    /**
     * get subcategories and insert
     */
    const found_subCategories = []
    for (const category of categories) {
      found_subCategories.push(await getSubCategoriesFromJumia(category.href, category.id))
    }
    const subcategories = await subcategoryRepository.addSubCategories(found_subCategories)
    /**
     * get products and insert
     */
    const found_products = []
    for (const subcategory of subcategories) {
      found_products.push(await getProductsFromJumia(subcategory.href, 1, subcategory.id))
    }
    const products = await productRepository.addProducts(found_products)

    return products
}

export async function getAllProducts({ productId , subcategoryId }: any) {
  return await productRepository.getAllProductsAndPopulate({ productId , subcategoryId })
}
