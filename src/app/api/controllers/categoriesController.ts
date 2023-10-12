import * as categoriesService from '../services/categoriesService';
import { NextRequest, NextResponse } from "next/server";

export async function getAllCategories(request: NextRequest) {
    try {
      const categories = await categoriesService.getAllCategories()
      let json_response = {
        status: "success",
        categories,
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