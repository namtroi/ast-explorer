// source.ts
class PaymentService {
  private apiKey: string;

  constructor() {
    this.apiKey = '12345';
  }

  processPayment(amount: number) {
    console.log('Processing payment...');
    this.validateAmount(amount);
    this.sendToBank();
  }

  validateAmount(amount: number) {
    if (amount < 0) {
      throw new Error('Invalid amount');
    }
  }

  private sendToBank() {
    console.log('Sending to bank API...');
  }
}
