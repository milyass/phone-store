import * as ProductService from '../services/productService';
import { NextRequest, NextResponse } from "next/server";



export async function getAllProducts(request: NextRequest) {
    try {
      const productId = request.nextUrl.searchParams.get('productId')
      const subcategoryId = request.nextUrl.searchParams.get('subcategoryId')
      const products = await ProductService.getAllProducts({ productId , subcategoryId })
      let json_response = {
        status: "success",
        // results: products.length,
        products,
      };
      return NextResponse.json(json_response);
    } catch (error: any) {
      let error_response = {
        status: "error",
        message: error.message,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  
  export async function scrapProducts(request: NextRequest, res: NextResponse) {
    try {
      const scrappedProducts = await ProductService.scrapFromJumiaAndAddToDatabase()
      let json_response = {
        status: "success",
        data: {
          scrappedProducts,
        },
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      let error_response = {
        status: "error",
        message: error.message,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  