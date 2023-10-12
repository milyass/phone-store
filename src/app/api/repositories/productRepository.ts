import prisma from '../services/prismaService';


export async function addProducts(parent_subcategories_products: any) {
  try {
      const data = [];
      for (const child_subcategories_products of parent_subcategories_products) {
        for (const product of child_subcategories_products) {
          const { subcategory, name, url, image, brand, delivery, price, availability, specifications } = product;
          data.push(
            await prisma.product.create({
              data: {
                name,
                url,
                image: image || 'N/A',
                brand: brand || 'N/A',
                delivery: delivery || 'N/A',
                price: price || 'N/A',
                availability: availability || 'N/A',
                subcategory: {
                  connect: { id: subcategory },
                },
                specifications: {
                  create: specifications.map((spec:any) => ({ key: spec.key, value: spec.value })),
                },
              },
   
            })
          );
        }
        
      }
      return data
  } catch (error) {
    throw error
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect()
  }
}

export async function getAllProductsAndPopulate({productId, subcategoryId}: any) {
  try {
    let products;
    if (productId || subcategoryId) {
      const whereClause = productId && { id: Number(productId) } || { subcategoryId: Number(subcategoryId)}
      products = await prisma.product.findMany({
        where: whereClause,
        include: {
          subcategory: {
            include: {
              category: true,
            },
          },
          specifications: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        include: {
          subcategory: {
            include: {
              category: true,
            },
          },
          specifications: true,
        },
      });
    }
    return products
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect();
  }
}


