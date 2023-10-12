import * as subcategoriesService from '../services/subcategoriesService';
import { NextRequest, NextResponse } from "next/server";

export async function getAllSubCategories(request: NextRequest) {
    try {
      const categoryId = Number(request.nextUrl.searchParams.get('categoryId'))
      const subcategories = await subcategoriesService.getAllSubcategoriesByCategoryId(categoryId)
      let json_response = {
        status: "success",
        subcategories,
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