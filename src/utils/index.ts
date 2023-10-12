import { Product, SubCategory, Category } from "@/interfaces";
const axios = require('axios');
const cheerio = require('cheerio');


export const getDataFromUrl = async (url: any) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $
}

export const getCategoriesFromJumia = async (): Promise <Category[]> =>  {
    const $ = await getDataFromUrl('https://www.jumia.ma/') 
    const menuDiv = $('div[role="menu"].flyout');
    const anchorTags = menuDiv.find('a');
    const found_categories: any[] = []
    anchorTags.each((index: number, element: any) => {
        if(index > 2) return
        const name = $(element).text();
        const href = $(element).attr('href');
        found_categories.push({ name, href })
    });
    return found_categories
}

export const getSubCategoriesFromJumia = async (category:string, category_id: number): Promise <SubCategory[]> =>  {
    const $ = await getDataFromUrl(`https://www.jumia.ma/${category}`)
    const anchorTags = $('a[data-eventcategory="Filters Apply"][data-eventaction="category"]');
    const found_subCategories:SubCategory[] = []
    anchorTags.each(async (index:number, element: any) => {
      if(index === 0 ) return
      const name = $(element).text();
      const href = $(element).attr('href');
      found_subCategories.push({
        name,
        href,
        category: category_id
      })
    });
    return found_subCategories
}

export const getProductsFromJumia= async (subCategory:string, numOfPages = 2, subCategory_id:number): Promise <Product[]> => {
    const products: Product[] = [];
    for (let page = 1; page <= numOfPages; page++) {
        const $ = await getDataFromUrl(`https://www.jumia.ma${subCategory}?page=${page}#catalog-listing`)
        console.log(`https://www.jumia.ma${subCategory}?page=${page}#catalog-listing`);
        const anchorTags = $('a[data-track-onview="eecProduct"]');
        anchorTags.each(async (index: number, element:any) => {
          const href = $(element).attr('href');
          const $$ = await getDataFromUrl(`https://www.jumia.ma${href}`)
          const marque = ($$('div.-pvxs:not([class*=" "]) > a._more:first')).text() || "Generic"
          const name = ($$('h1:first')).text()
          const image = ($$('a[data-pop-trig="lazy-img-zoom"]')).attr('href')
          const availability = ($$('p.-df')).text()
          const price = ($$('span.-b.-ltr.-tal.-fs24.-prxs')).text()
          const livraison = 
          ($$('div.-df.-fw-w.-c-bet.-fg1')).find('div:eq(1)')
          .children().map((index: number, childElement:any) => $(childElement).text()).get().join(' ')
        const specifications:any[] = []
        const liTags = $$('li.-pvxs');
        // Check if any matching <li> tags were found
        if (liTags.length > 0) {
            // Initialize variables to store the text from <span> and <li> tags
            let spanText;
            let liText;
            // Iterate through the selected <li> tags
            liTags.each((index:number, element:any) => {
            spanText = $(element).find('span:first').text();
            // Get the text of the <li> itself
            liText = $(element).text();
            // Remove the spanText from liText
            liText = liText.replace(spanText, '').replace(':', '')
            specifications.push({
                key: spanText,
                value: liText
            })
            });
        }
        const productInfo = {
            subcategory: subCategory_id,
            name,
            url: href,
            image,
            brand: marque,
            delivery: livraison,
            price,
            availability,
            specifications
        }
        products.push(productInfo)
        });
    }
    return products
}