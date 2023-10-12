import * as subcategoryRepository from '../repositories/subcategoryRepository';

export async function getAllSubcategoriesByCategoryId(categoryId: number) {
    return await subcategoryRepository.getAllSubcategoriesByCategoryId(categoryId)
}
  