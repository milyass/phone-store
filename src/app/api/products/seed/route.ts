import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { scrapProducts } from '@/app/api/controllers/productsController';

export async function POST(req: NextRequest, res: NextResponse) {
    return await scrapProducts(req, res)
}