import * as categoryRepository from '../repositories/categoryRepository';

export async function getAllCategories() {
    return await categoryRepository.getAllCategories()
}