export interface ILogger {
  log(message: string): void;
  error(message: string, trace?: any): void;
}

export abstract class BaseService {
  protected serviceName: string;

  constructor(name: string) {
    this.serviceName = name;
  }

  abstract healthCheck(): boolean;

  protected getServiceId(): string {
    return `${this.serviceName}-${Date.now()}`;
  }
}

export class ConsoleLogger implements ILogger {
  log(message: string) {
    console.log(`[INFO]: ${message}`);
  }

  error(message: string, trace?: any) {
    console.error(`[ERROR]: ${message}`, trace);
  }
}

export class InventoryService extends BaseService {
  private stock: Map<string, number>;

  constructor() {
    super('InventoryService');
    this.stock = new Map();
  }

  healthCheck(): boolean {
    return this.stock !== undefined;
  }

  checkStock(sku: string, quantity: number): boolean {
    const current = this.stock.get(sku) || 0;
    return current >= quantity;
  }

  updateStock(sku: string, quantity: number): void {
    const current = this.stock.get(sku) || 0;
    this.stock.set(sku, current - quantity);
  }
}

export class PaymentService extends BaseService {
  constructor() {
    super('PaymentService');
  }

  healthCheck(): boolean {
    return true;
  }

  async processTransaction(amount: number, currency: string): Promise<string> {
    this.validateCurrency(currency);
    return 'txn_123456789';
  }

  private validateCurrency(currency: string) {
    if (currency !== 'USD' && currency !== 'EUR') {
      throw new Error('Unsupported currency');
    }
  }
}

export class OrderController {
  private inventory: InventoryService;
  private payment: PaymentService;
  private logger: ConsoleLogger;

  constructor(
    inventory: InventoryService,
    payment: PaymentService,
    logger: ConsoleLogger
  ) {
    this.inventory = inventory;
    this.payment = payment;
    this.logger = logger;
  }

  async createOrder(sku: string, quantity: number, amount: number) {
    this.logger.log(`Attempting to create order for ${sku}`);

    if (!this.inventory.checkStock(sku, quantity)) {
      throw new Error('Out of stock');
    }

    try {
      const txnId = await this.payment.processTransaction(amount, 'USD');
      this.inventory.updateStock(sku, quantity);
      this.logger.log(`Order created successfully. Txn: ${txnId}`);
      return { success: true, txnId };
    } catch (err) {
      this.logger.error('Order failed', err);
      return { success: false };
    }
  }

  static getControllerVersion(): string {
    return '1.0.0';
  }
}
