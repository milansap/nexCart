import crypto from 'crypto';

export const ESEWA_CONFIG = {
  SANDBOX_URL: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
  PRODUCTION_URL: 'https://epay.esewa.com.np/api/epay/main/v2/form',
  SANDBOX_STATUS_URL: 'https://rc.esewa.com.np/api/epay/transaction/status/',
  PRODUCTION_STATUS_URL: 'https://esewa.com.np/api/epay/transaction/status/',
  PRODUCT_CODE: process.env.ESEWA_PRODUCT_CODE || 'EPAYTEST',
  SECRET_KEY: process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q',
  MERCHANT_CODE: process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST',
  IS_PRODUCTION: process.env.NODE_ENV === 'production' && process.env.ESEWA_PRODUCTION === 'true',
};

export function generateESewaSignature(
  totalAmount: string,
  transactionUUID: string,
  productCode: string
): string {
  const message =`total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
  const hash = crypto
    .createHmac('sha256', ESEWA_CONFIG.SECRET_KEY)
    .update(message)
    .digest('base64');
  return hash;
}

export function generateTransactionUUID(): string {
  const now = new Date();
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  return timestamp;
}

export interface ESewaPaymentData {
  amount: number;
  tax_amount: number;
  product_service_charge: number;
  product_delivery_charge: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
  success_url: string;
  failure_url: string;
}

export function prepareESewaPayment(
  amount: number,
  taxAmount: number = 0,
  serviceCharge: number = 0,
  deliveryCharge: number = 0,
  successUrl: string,
  failureUrl: string
): ESewaPaymentData {
  const transactionUUID = generateTransactionUUID();
  const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
  
  const signature = generateESewaSignature(
    totalAmount.toString(),
    transactionUUID,
    ESEWA_CONFIG.PRODUCT_CODE
  );

  return {
    amount,
    tax_amount: taxAmount,
    product_service_charge: serviceCharge,
    product_delivery_charge: deliveryCharge,
    total_amount: totalAmount,
    transaction_uuid: transactionUUID,
    product_code: ESEWA_CONFIG.PRODUCT_CODE,
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    signature,
    success_url: successUrl,
    failure_url: failureUrl,
  };
}

export function decodeESewaResponse(encodedData: string): Record<string, any> {
  try {
    const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
    return JSON.parse(decodedData);
  } catch (error) {
    throw new Error('Failed to decode eSewa response');
  }
}

export function verifyESewaSignature(
  responseData: Record<string, any>
): boolean {
  try {
    const signature = responseData.signature;
    delete responseData.signature;

    const signedFieldNames = responseData.signed_field_names || '';
    const fields: string[] = signedFieldNames.split(',');
    
    let message = '';
    fields.forEach((field: string, index: number) => {
      message += `${field}=${responseData[field.trim()]}`;
      if (index < fields.length - 1) {
        message += ',';
      }
    });

    const calculatedSignature = crypto
      .createHmac('sha256', ESEWA_CONFIG.SECRET_KEY)
      .update(message)
      .digest('base64');

    return signature === calculatedSignature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}
