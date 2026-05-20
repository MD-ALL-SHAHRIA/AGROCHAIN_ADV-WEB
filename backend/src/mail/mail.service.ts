


import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger('MailEngine 📧');

  constructor(private readonly mailerService: MailerService) {}


  async sendPaymentSuccess(email: string, amount: number, orderId: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '🎉 Payment Successful - AgroChain',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f7f6;">
            <h2 style="color: #2e7d32;">Payment Received!</h2>
            <p>Dear User,</p>
            <p>Your payment of <strong>${amount} BDT</strong> for order <strong>#${orderId}</strong> has been successfully processed.</p>
            <p>The inventory lot has been locked and the seller will contact you shortly for delivery.</p>
            <br/>
            <p>Thank you for using AgroChain!</p>
          </div>
        `,
      });
      this.logger.log(`Payment success email sent strictly to: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send payment email to ${email}`, error.stack);
      throw error; 
    }
  }

 
  async sendWeeklyDigest(email: string, campaignName: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `🌾 ${campaignName} - AgroChain`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #81c784;">
            <h2 style="color: #2e7d32;">Weekly Fresh Harvest!</h2>
            <p>Hello,</p>
            <p>Check out the latest fresh crop lots listed by our trusted farmers this week.</p>
            <a href="http://localhost:3000/market" style="background: #4caf50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Market Feed</a>
          </div>
        `,
      });
      this.logger.log(`Weekly digest email sent to: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send digest email to ${email}`, error.stack);
      throw error;
    }
  }

  
  async sendPasswordResetEmail(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '🔐 Reset Your Password - AgroChain',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: auto; padding: 30px; border-radius: 12px; background: linear-gradient(145deg, #f0fdf4, #ffffff); box-shadow: 0 8px 16px rgba(0,0,0,0.05); border: 1px solid #c8e6c9;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="font-size: 40px;">🌱</span>
              <h2 style="color: #1b5e20; margin-top: 10px;">Password Reset Request</h2>
            </div>
            <p style="color: #424242; font-size: 16px; line-height: 1.5;">Hello there,</p>
            <p style="color: #424242; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Please use the shiny OTP code below to securely change your credentials:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; background: #e8f5e9; color: #2e7d32; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 8px; letter-spacing: 6px; border: 2px dashed #81c784;">
                ${otp}
              </span>
            </div>
            
            <p style="color: #757575; font-size: 14px; text-align: center;">⏱️ This code will magically expire in <strong>5 minutes</strong>.</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p style="color: #9e9e9e; font-size: 12px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
      this.logger.log(`✨ Magic OTP safely delivered to: ${email}`);
    } catch (error) {
      this.logger.error(`🚨 Failed to shoot OTP email to ${email}`, error.stack);
      throw error;
    }
  }
}