export class UserManager {
  private dbConnection: any;

  constructor() {
    this.dbConnection = null;
  }

  createUser(username: string, email: string) {
    if (!username || !email) {
      throw new Error('Missing required fields');
    }
    this.checkUserExists(username);
    this.saveToDatabase(username, email);
  }

  deleteUser(userId: string) {
    console.log('Deleting user...');
  }

  getUserProfile(userId: string) {
    return { id: userId, name: 'Admin' };
  }

  private checkUserExists(username: string) {
    if (username === 'admin') {
      throw new Error('User already exists');
    }
  }

  private saveToDatabase(username: string, email: string) {
    console.log('Saving user to DB');
  }
}

export class EmailService {
  sendWelcomeEmail(email: string) {
    this.connectToSmtp();
    console.log('Sending welcome email to ' + email);
  }

  sendPasswordReset(email: string) {
    console.log('Sending password reset link');
  }

  private connectToSmtp() {
    console.log('Connecting to SMTP server...');
  }
}
