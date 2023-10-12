import prisma from '../services/prismaService';


export async function addCategories(categoriesData: any) {
  try {
    const data = []
    for (const categoryData of categoriesData) {
      data.push((await prisma.category.create({
        data: {
          name: categoryData.name,
          href: categoryData.href
        }
      })))
    }
    return data
  } catch (error) {
    throw error
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect()
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
      },
    });
    return categories
  } catch (error) {
    console.error('Error retrieving categories:', error);
    throw error;
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect();
  }
}