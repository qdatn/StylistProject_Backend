export interface RefundRequestDto {
  orderId: string;
  transId: number | string;
  amount: number;
  description?: string;
  requestId?: string;
}

export interface RefundStatusQueryDto {
  orderId: string;
  requestId: string;
}

export interface RefundResponseDto {
  success: boolean;
  data: {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    transId?: number;
    lang: string;
    description?: string;
    transGroup?: Array<{
      itemId: string;
      amount: string;
      transId: string;
    }>;
    signature: string;
    responseTime?: number;
    message?: string;
    resultCode?: number;
  };
  message: string;
}

export interface RefundErrorDto {
  error: {
    responseTime?: number;
    message?: string;
    resultCode?: number;
  };
  message: string;
}
