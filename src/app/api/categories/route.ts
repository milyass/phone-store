import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAllCategories } from '@/app/api/controllers/categoriesController'

export async function GET(req: NextRequest, res: NextResponse) {
    return await getAllCategories(req)
}