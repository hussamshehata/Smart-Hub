// utils/email.js
import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// Send email verification
export const sendVerificationEmail = async (email, token) => {
    try {
        const verificationUrl = `${process.env.EMAIL_VERIFICATION_URL}/${token}`;

        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify Your Email Address',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Email Verification</h2>
                    <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                    <div style="margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #4CAF50; 
                                  color: white; 
                                  padding: 12px 30px; 
                                  text-decoration: none; 
                                  border-radius: 5px;
                                  display: inline-block;">
                            Verify Email
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        This link will expire in 24 hours.
                    </p>
                    <p style="color: #666; font-size: 14px;">
                        If you didn't create an account, you can safely ignore this email.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px;">
                        This is an automated email, please do not reply.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent to ${email}`);

    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token) => {
    try {
        const resetUrl = `${process.env.PASSWORD_RESET_URL}/${token}`;

        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>You requested to reset your password. Click the button below to proceed:</p>
                    <div style="margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #f44336; 
                                  color: white; 
                                  padding: 12px 30px; 
                                  text-decoration: none; 
                                  border-radius: 5px;
                                  display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        This link will expire in 1 hour.
                    </p>
                    <p style="color: #666; font-size: 14px;">
                        If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px;">
                        This is an automated email, please do not reply.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent to ${email}`);

    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};

// Send order confirmation email
// export const sendOrderConfirmationEmail = async (email, orderData) => {
//     try {
//         const transporter = createTransporter();
//
//         const mailOptions = {
//             from: process.env.EMAIL_FROM,
//             to: email,
//             subject: `Order Confirmation - ${orderData.orderNumber}`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                     <h2 style="color: #333;">Order Confirmation</h2>
//                     <p>Thank you for your order!</p>
//                     <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
//                         <h3 style="margin-top: 0;">Order #${orderData.orderNumber}</h3>
//                         <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
//                         <p><strong>Status:</strong> ${orderData.status}</p>
//                     </div>
//                     <p>We'll send you another email when your order ships.</p>
//                     <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//                     <p style="color: #999; font-size: 12px;">
//                         This is an automated email, please do not reply.
//                     </p>
//                 </div>
//             `
//         };
//
//         await transporter.sendMail(mailOptions);
//         console.log(`✅ Order confirmation email sent to ${email}`);
//
//     } catch (error) {
//         console.error('Error sending order confirmation email:', error);
//         throw new Error('Failed to send order confirmation email');
//     }
// };
//
// // Send welcome email
// export const sendWelcomeEmail = async (email, name) => {
//     try {
//         const transporter = createTransporter();
//
//         const mailOptions = {
//             from: process.env.EMAIL_FROM,
//             to: email,
//             subject: 'Welcome to Our Store!',
//             html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                     <h2 style="color: #333;">Welcome, ${name}! 🎉</h2>
//                     <p>We're excited to have you on board!</p>
//                     <p>Your account has been successfully created. You can now:</p>
//                     <ul>
//                         <li>Browse our products</li>
//                         <li>Add items to your cart</li>
//                         <li>Track your orders</li>
//                         <li>Save your favorite items</li>
//                     </ul>
//                     <div style="margin: 30px 0;">
//                         <a href="${process.env.FRONTEND_URL}"
//                            style="background-color: #4CAF50;
//                                   color: white;
//                                   padding: 12px 30px;
//                                   text-decoration: none;
//                                   border-radius: 5px;
//                                   display: inline-block;">
//                             Start Shopping
//                         </a>
//                     </div>
//                     <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//                     <p style="color: #999; font-size: 12px;">
//                         This is an automated email, please do not reply.
//                     </p>
//                 </div>
//             `
//         };
//
//         await transporter.sendMail(mailOptions);
//         console.log(`✅ Welcome email sent to ${email}`);
//
//     } catch (error) {
//         console.error('Error sending welcome email:', error);
//         // Don't throw error for welcome email
//     }
// };