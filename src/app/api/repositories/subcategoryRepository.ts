import prisma from "../services/prismaService";

export async function addSubCategories(parent_subcategories: any) {
  try {
    const data = [];
    for (const child_subcategories of parent_subcategories) {
      for (const subcategory of child_subcategories)
        data.push(
          await prisma.subCategory.create({
            data: {
              name: subcategory.name,
              href: subcategory.href,
              category: {
                connect: { id: subcategory.category },
              },
            },
          })
        );
    }
    return data;
  } catch (error) {
    throw error;
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect();
  }
}

export async function getAllSubcategoriesByCategoryId(categoryId: number) {
  try {
    const subcategories = await prisma.subCategory.findMany({
      where: { categoryId: categoryId },
    });
    return subcategories
  } catch (error) {
    console.error('Error retrieving subcategories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}