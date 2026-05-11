import { NextRequest, NextResponse } from 'next/server';
import { verifyESewaSignature, decodeESewaResponse, ESEWA_CONFIG } from '@/lib/esewa';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'No payment data provided' },
        { status: 400 }
      );
    }

    // Decode the base64 encoded response from eSewa
    const decodedData = decodeESewaResponse(data);

    // Verify the signature
    const isSignatureValid = verifyESewaSignature(decodedData);

    if (!isSignatureValid) {
      return NextResponse.json(
        { error: 'Invalid signature', status: 'FAILED' },
        { status: 400 }
      );
    }

    // Check transaction status
    if (decodedData.status === 'COMPLETE') {
      // Save transaction to database here
      return NextResponse.json({
        success: true,
        status: 'COMPLETE',
        message: 'Payment verified successfully',
        transactionCode: decodedData.transaction_code,
        transactionUUID: decodedData.transaction_uuid,
        totalAmount: decodedData.total_amount,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: decodedData.status,
          message: `Payment ${decodedData.status}`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
