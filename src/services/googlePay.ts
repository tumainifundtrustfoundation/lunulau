import { SystemConfig } from '../types';
import { fetchSystemConfig } from '../firebase';

// Declaration for window.google.payments.api
declare global {
  interface Window {
    google?: {
      payments?: {
        api?: {
          PaymentsClient: new (options: {
            environment: 'TEST' | 'PRODUCTION';
            paymentDataCallbacks?: any;
          }) => any;
        };
      };
    };
  }
}

let cachedConfig: SystemConfig | null = null;

export async function getGooglePayConfig(): Promise<SystemConfig | null> {
  if (cachedConfig) return cachedConfig;
  try {
    cachedConfig = await fetchSystemConfig();
    return cachedConfig;
  } catch (err) {
    console.warn('Failed to load system config for Google Pay:', err);
    return null;
  }
}

/**
 * Checks if the Google Pay API script is loaded and available
 */
export function isGooglePayScriptLoaded(): boolean {
  return typeof window !== 'undefined' && !!window.google?.payments?.api?.PaymentsClient;
}

/**
 * Builds base Google Pay Payment Request object
 */
export function getBaseGooglePayRequest() {
  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ]
  };
}

/**
 * Builds payment data request for a transaction
 */
export function buildPaymentDataRequest(options: {
  amount: number;
  currencyCode?: string;
  countryCode?: string;
  merchantName?: string;
  merchantId?: string;
  environment?: 'TEST' | 'PRODUCTION';
  gateway?: string;
  gatewayMerchantId?: string;
}) {
  const {
    amount,
    currencyCode = 'TZS',
    countryCode = 'TZ',
    merchantName = 'Lupanulla Elimu Hub',
    merchantId,
    gateway = 'example',
    gatewayMerchantId = 'exampleGatewayMerchantId'
  } = options;

  const baseRequest = getBaseGooglePayRequest();

  // Set the gateway parameters if provided
  baseRequest.allowedPaymentMethods[0].tokenizationSpecification.parameters = {
    gateway: gateway || 'example',
    gatewayMerchantId: gatewayMerchantId || 'exampleGatewayMerchantId'
  };

  const paymentDataRequest: any = {
    ...baseRequest,
    merchantInfo: {
      merchantName: merchantName || 'Lupanulla Elimu Hub'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: amount.toString(),
      currencyCode: currencyCode,
      countryCode: countryCode
    }
  };

  if (merchantId && merchantId.trim()) {
    paymentDataRequest.merchantInfo.merchantId = merchantId.trim();
  }

  return paymentDataRequest;
}

/**
 * Initializes and checks if Google Pay is ready to make payments
 */
export async function checkGooglePayReady(environment: 'TEST' | 'PRODUCTION' = 'TEST'): Promise<boolean> {
  if (!isGooglePayScriptLoaded()) {
    return false;
  }

  try {
    const paymentsClient = new window.google!.payments!.api!.PaymentsClient({
      environment: environment
    });

    const isReadyToPayRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER']
          }
        }
      ]
    };

    const response = await paymentsClient.isReadyToPay(isReadyToPayRequest);
    return !!response.result;
  } catch (err) {
    console.warn('Google Pay isReadyToPay check failed:', err);
    return false;
  }
}

/**
 * Creates and renders the official Google Pay button into a container element
 */
export function createGooglePayButton(
  container: HTMLElement,
  options: {
    onClick: () => void;
    environment?: 'TEST' | 'PRODUCTION';
    buttonColor?: 'default' | 'black' | 'white';
    buttonType?: 'buy' | 'plain' | 'pay' | 'checkout' | 'order' | 'subscribe';
    buttonSizeMode?: 'static' | 'fill';
  }
): HTMLElement | null {
  if (!isGooglePayScriptLoaded()) return null;

  try {
    const paymentsClient = new window.google!.payments!.api!.PaymentsClient({
      environment: options.environment || 'TEST'
    });

    const button = paymentsClient.createButton({
      onClick: options.onClick,
      buttonColor: options.buttonColor || 'black',
      buttonType: options.buttonType || 'pay',
      buttonSizeMode: options.buttonSizeMode || 'fill'
    });

    container.innerHTML = '';
    container.appendChild(button);
    return button;
  } catch (err) {
    console.warn('Failed to create official Google Pay button:', err);
    return null;
  }
}

/**
 * Prompts the Google Pay sheet to complete a payment
 */
export async function requestGooglePayment(options: {
  amount: number;
  currencyCode?: string;
  countryCode?: string;
  merchantName?: string;
  merchantId?: string;
  environment?: 'TEST' | 'PRODUCTION';
  gateway?: string;
  gatewayMerchantId?: string;
}): Promise<{
  success: boolean;
  paymentData?: any;
  transactionId?: string;
  error?: string;
}> {
  if (!isGooglePayScriptLoaded()) {
    return {
      success: false,
      error: 'Google Pay SDK haijapakuliwa au haipatikani kwenye kivinjari hiki.'
    };
  }

  try {
    const env = options.environment || 'TEST';
    const paymentsClient = new window.google!.payments!.api!.PaymentsClient({
      environment: env
    });

    const paymentDataRequest = buildPaymentDataRequest(options);
    const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);

    // Extract transaction token / reference
    const tokenObj = paymentData?.paymentMethodData?.tokenizationData?.token;
    let transactionId = 'GPAY-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

    if (tokenObj) {
      try {
        const parsed = typeof tokenObj === 'string' ? JSON.parse(tokenObj) : tokenObj;
        if (parsed.id) {
          transactionId = parsed.id;
        }
      } catch {
        // use generated GPAY transactionId
      }
    }

    return {
      success: true,
      paymentData,
      transactionId
    };
  } catch (err: any) {
    // User closed window or cancelled
    if (err.statusCode === 'CANCELED') {
      return {
        success: false,
        error: 'Malipo yameghairiwa na mtumiaji.'
      };
    }
    console.error('Google Pay payment error:', err);
    return {
      success: false,
      error: err.message || err.statusMessage || 'Hitilafu imetokea wakati wa kuchakata Google Pay.'
    };
  }
}
