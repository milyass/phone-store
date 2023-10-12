import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAllProducts } from '@/app/api/controllers/productsController';

export async function GET(req: NextRequest, res: NextResponse) {
    return await getAllProducts(req)
}
