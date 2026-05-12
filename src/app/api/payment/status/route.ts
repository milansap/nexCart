import { NextRequest, NextResponse } from 'next/server';
import { ESEWA_CONFIG } from '@/lib/esewa';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productCode, transactionUUID, totalAmount } = body;

    if (!productCode || !transactionUUID || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const statusUrl = new URL(
      ESEWA_CONFIG.IS_PRODUCTION
        ? ESEWA_CONFIG.PRODUCTION_STATUS_URL
        : ESEWA_CONFIG.SANDBOX_STATUS_URL
    );

    statusUrl.searchParams.append('product_code', productCode);
    statusUrl.searchParams.append('transaction_uuid', transactionUUID);
    statusUrl.searchParams.append('total_amount', totalAmount.toString());

    const response = await fetch(statusUrl.toString());
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
