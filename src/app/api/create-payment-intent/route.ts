import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// 检查环境变量是否存在，如果不存在则使用占位符
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    // 在运行时检查是否有真实的 Stripe 密钥
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe configuration is missing. Please contact support.' },
        { status: 500 }
      );
    }

    const { amount, currency = 'usd', needInvoice, invoiceData } = await request.json();

    // 创建客户（如果需要发票）
    let customer;
    if (needInvoice && invoiceData) {
      customer = await stripe.customers.create({
        email: invoiceData.billingEmail,
        name: invoiceData.companyName,
        address: {
          line1: invoiceData.billingAddress,
        },
        metadata: {
          taxId: invoiceData.taxId || '',
        },
      });
    }

    // 创建支付意图
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // 转换为分
      currency,
      customer: customer?.id,
      metadata: {
        product: 'Climate Seal Standard Plan',
        needInvoice: needInvoice.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer?.id,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}