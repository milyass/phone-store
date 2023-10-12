import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAllSubCategories } from '@/app/api/controllers/subcategoriesController';

export async function GET(req: NextRequest, res: NextResponse) {
    return await getAllSubCategories(req)
}
