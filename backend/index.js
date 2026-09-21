import express from 'express';
import cors from 'cors';
import { Parser } from 'json2csv';
import pool, { initDB } from './db.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === 'true' || Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER || 'support@coact.co.in',
    pass: process.env.EMAIL_PASSWORD || 'llzqtrygnymzagzg'
  }
});

// Helper function to send emails
async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"CiploStem Medical Portal" <support@coact.co.in>',
      to,
      subject,
      html
    });
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Validation helpers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const INTERNATIONAL_PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;
const MCI_REGEX = /^[A-Za-z0-9\-\/\s]{3,20}$/;

function validateEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return INDIAN_PHONE_REGEX.test(digits);
  }
  return INTERNATIONAL_PHONE_REGEX.test(digits);
}

function validateMci(code) {
  return MCI_REGEX.test(code.trim());
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// ==========================================
// DOCTOR AUTHENTICATION ROUTES
// ==========================================

// 1. Doctor Registration (Sign Up)
// Required fields: email, city, phone, mci_code
app.post('/api/auth/register', async (req, res) => {
  try {
    let { email, city, phone, mci_code } = req.body;

    if (!email || !city || !phone || !mci_code) {
      return res.status(400).json({
        success: false,
        message: 'All fields (Email ID, City, Phone Number, MCI Code) are required.'
      });
    }

    email = email.trim().toLowerCase();
    city = city.trim();
    phone = phone.trim();
    mci_code = mci_code.trim();

    const validationErrors = {};

    // Email validation
    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address (e.g., doctor@hospital.com).';
    }

    // City validation (at least 2 characters)
    if (city.length < 2) {
      validationErrors.city = 'City name must be at least 2 characters long.';
    }

    // Phone validation
    if (!validatePhone(phone)) {
      validationErrors.phone = 'Please enter a valid phone number. For India: 10 digits starting with 6-9. International: include country code with +.';
    }

    // MCI Code validation
    if (!validateMci(mci_code)) {
      validationErrors.mci_code = 'Please enter a valid MCI / Medical Council Code (3-20 characters, letters, numbers, hyphens allowed).';
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields before submitting.',
        validation_errors: validationErrors
      });
    }

    // Check if email already exists
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This Email ID is already registered. Please sign in with your email to receive an OTP.'
      });
    }

    // Check if phone already exists
    const [existingPhones] = await pool.query('SELECT id FROM users WHERE phone = ?', [phone]);
    if (existingPhones.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This phone number is already associated with another registration.',
        validation_errors: { phone: 'This phone number is already registered.' }
      });
    }

    // Check if MCI code already exists
    const [existingMci] = await pool.query('SELECT id FROM users WHERE mci_code = ?', [mci_code]);
    if (existingMci.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This MCI Code is already associated with another registration.',
        validation_errors: { mci_code: 'This MCI Code is already registered.' }
      });
    }

    // Insert new user
    await pool.query(
      'INSERT INTO users (email, city, phone, mci_code) VALUES (?, ?, ?, ?)',
      [email, city, phone, mci_code]
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now sign in with your email.'
    });
  } catch (error) {
    console.error('Error in doctor registration:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration. Please try again.'
    });
  }
});

// 2. Doctor Send OTP (Sign In Step 1)
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email ID is required.'
      });
    }

    email = email.trim().toLowerCase();

    // Basic email validation before querying
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid registered Email ID.'
      });
    }

    // Verify user exists in database
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email not registered. Please complete registration (Sign Up) first.'
      });
    }

    const doctor = users[0];

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expiry: 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Remove any previous active OTPs for this email
    await pool.query('DELETE FROM otps WHERE email = ?', [email]);

    // Insert new OTP
    await pool.query(
      'INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)',
      [email, otp, expiresAt]
    );

    // Send styled medical email with OTP
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
          .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; margin-bottom: 16px; color: #0f172a; }
          .otp-box { background: #f0f9ff; border: 2px dashed #0284c7; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0369a1; }
          .otp-note { font-size: 13px; color: #64748b; margin-top: 8px; }
          .details { background: #f8fafc; border-radius: 8px; padding: 14px 18px; margin-top: 20px; font-size: 13px; color: #475569; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CiploStem™ Doctor Portal</h1>
            <p>Healthcare Professional Verification</p>
          </div>
          <div class="content">
            <p class="greeting">Dear Doctor,</p>
            <p>Your one-time verification code (OTP) to access the CiploStem Medical Portal is:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="otp-note">Valid for 10 minutes. Do not share this code with anyone.</div>
            </div>

            <div class="details">
              <div><strong>Registered MCI Code:</strong> ${doctor.mci_code}</div>
              <div><strong>City:</strong> ${doctor.city}</div>
            </div>

            <p style="font-size: 13px; color: #64748b; margin-top: 24px; line-height: 1.5;">
              If you did not request this OTP, please disregard this email. For any assistance, please contact CiploStem Support at support@coact.co.in.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} CiploStem Medical Affairs. All rights reserved.<br>
            Confidential Healthcare Professional Portal.
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(email, 'Your CiploStem Portal Verification Code (OTP)', emailHtml);

    res.json({
      success: true,
      message: 'A 6-digit OTP has been sent to your registered email ID.'
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP to email. Please verify email and try again.'
    });
  }
});

// 3. Doctor Direct Login (Sign In - NO OTP required)
app.post('/api/auth/login', async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email ID is required.'
      });
    }

    email = email.trim().toLowerCase();

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid registered Email ID.'
      });
    }

    // Verify user exists in database
    const [users] = await pool.query(
      'SELECT id, email, city, phone, mci_code, is_verified, created_at FROM users WHERE email = ?',
      [email]
    );
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email not registered. Please complete registration (Sign Up) first.'
      });
    }

    const user = users[0];

    // Mark user as verified
    await pool.query('UPDATE users SET is_verified = TRUE WHERE email = ?', [email]);

    res.json({
      success: true,
      message: 'Login successful! Welcome to CiploStem.',
      user: {
        id: user.id,
        email: user.email,
        city: user.city,
        phone: user.phone,
        mci_code: user.mci_code,
        is_verified: true
      }
    });
  } catch (error) {
    console.error('Error in doctor direct login:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sign in. Please try again.'
    });
  }
});

// 4. Doctor Verify OTP (Sign Up / Registration verification)
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email ID and OTP code are required.'
      });
    }

    email = email.trim().toLowerCase();
    otp = otp.trim();

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format.'
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'OTP must be a 6-digit numeric code.'
      });
    }

    // Query active OTP
    const [rows] = await pool.query(
      'SELECT * FROM otps WHERE email = ? AND otp = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new verification code.'
      });
    }

    // OTP is valid - delete from otps table
    await pool.query('DELETE FROM otps WHERE email = ?', [email]);

    // Mark user as verified
    await pool.query('UPDATE users SET is_verified = TRUE WHERE email = ?', [email]);

    // Fetch user details
    const [users] = await pool.query(
      'SELECT id, email, city, phone, mci_code, is_verified, created_at FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];

    res.json({
      success: true,
      message: 'Verification successful! Welcome to CiploStem.',
      user: {
        id: user.id,
        email: user.email,
        city: user.city,
        phone: user.phone,
        mci_code: user.mci_code,
        is_verified: !!user.is_verified
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP. Please try again.'
    });
  }
});

// ==========================================
// CONTACT & ADMIN ROUTES
// ==========================================

// Submit contact
app.post('/api/contact', async (req, res) => {
  try {
    const { full_name, email, phone, subject, message } = req.body;

    if (!full_name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name, email, phone number, and message are required fields.' 
      });
    }

    const validationErrors = {};

    // Full Name validation
    if (!full_name || full_name.trim().length < 2) {
      validationErrors.fullName = 'Full name must be at least 2 characters long.';
    }

    // Email validation
    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    // Phone validation
    if (!validatePhone(phone)) {
      validationErrors.phone = 'Please enter a valid phone number. For India: 10 digits starting with 6-9. International: include country code with +.';
    }

    // Message validation
    if (!message || message.trim().length < 10) {
      validationErrors.message = 'Message must be at least 10 characters long.';
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields before submitting.',
        validation_errors: validationErrors
      });
    }

    const query = `
      INSERT INTO contacts (full_name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [dbResult] = await pool.query(query, [full_name, email.trim(), phone.trim(), subject, message.trim()]);
    console.log(`[Contact] DB insert success - ID: ${dbResult.insertId}, Name: ${full_name}, Email: ${email}`);

    // 1) Send styled notification email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 28px 28px; }
          .greeting { font-size: 15px; margin-bottom: 18px; color: #0f172a; }
          .data-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #f8fafc; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
          .data-table tr td { padding: 11px 16px; font-size: 13px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
          .data-table tr:last-child td { border-bottom: none; }
          .data-table td:first-child { font-weight: 700; color: #475569; width: 120px; background: #f1f5f9; }
          .data-table td:last-child { color: #0f172a; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>CiploStem Contact Inquiries Dashboard</p>
          </div>
          <div class="content">
            <p class="greeting">Hello Admin,</p>
            <p style="font-size: 13px; color: #64748b; margin: 0 0 18px;">A new contact inquiry has been submitted via the CiploStem website:</p>
            <table class="data-table">
              <tr><td>Full Name</td><td>${full_name}</td></tr>
              <tr><td>Email</td><td>${email}</td></tr>
              <tr><td>Phone</td><td>${phone || 'Not provided'}</td></tr>
              <tr><td>Subject</td><td>${subject || 'General inquiry'}</td></tr>
              <tr><td>Message</td><td style="white-space: pre-wrap; line-height: 1.6;">${message}</td></tr>
              <tr><td>Submitted</td><td>${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td></tr>
            </table>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} CiploStem Medical Affairs · Contact Inquiry #${dbResult.insertId}
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const adminResult = await sendEmail(
        process.env.ADMIN_EMAIL || 'support@coact.co.in',
        `[New Inquiry #${dbResult.insertId}] ${subject || 'Contact Form'} - ${full_name}`,
        adminEmailHtml
      );
      console.log(`[Contact] Admin notification email sent - MessageID: ${adminResult.messageId}`);
    } catch (emailErr) {
      console.error(`[Contact] FAILED to send admin notification email:`, emailErr.message);
    }

    // 2) Send styled confirmation email to the submitter
    const userConfirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
          .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; margin-bottom: 12px; color: #0f172a; }
          .msg { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 20px; }
          .summary { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 16px 18px; font-size: 13px; color: #0c4a6e; }
          .summary-title { font-weight: 700; color: #0369a1; margin-bottom: 12px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; display: block; }
          .summary-table { width: 100%; border-collapse: collapse; }
          .summary-table td { padding: 7px 4px; font-size: 13px; vertical-align: top; border-bottom: 1px solid #dbeafe; }
          .summary-table tr:last-child td { border-bottom: none; }
          .summary-label { font-weight: 700; color: #075985; width: 120px; white-space: nowrap; }
          .summary-value { color: #0c4a6e; font-weight: 500; }
          .msg-preview-wrapper { margin-top: 14px; }
          .msg-preview-label { font-weight: 700; color: #075985; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; display: block; margin-bottom: 6px; }
          .msg-preview { background: #ffffff; border: 1px solid #e0f2fe; border-left: 3px solid #0284c7; padding: 12px 14px; border-radius: 6px; font-style: italic; color: #334155; white-space: pre-wrap; line-height: 1.6; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us</h1>
            <p>CiploStem Medical Team</p>
          </div>
          <div class="content">
            <p class="greeting">Dear ${full_name},</p>
            <p class="msg">
              Thank you for reaching out to the CiploStem team. We have successfully received your message
              and our medical affairs team will review your inquiry shortly.
            </p>
            <p class="msg">
              You can expect a response within 1&ndash;2 business days. For urgent matters, please call our
              support line directly.
            </p>
            <div class="summary">
              <span class="summary-title">Inquiry Summary</span>
              <table class="summary-table" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="summary-label">Full Name</td>
                  <td class="summary-value">${full_name}</td>
                </tr>
                <tr>
                  <td class="summary-label">Email Address</td>
                  <td class="summary-value">${email}</td>
                </tr>
                <tr>
                  <td class="summary-label">Phone Number</td>
                  <td class="summary-value">${phone}</td>
                </tr>
                <tr>
                  <td class="summary-label">Subject</td>
                  <td class="summary-value">${subject || 'General inquiry'}</td>
                </tr>
                <tr>
                  <td class="summary-label">Submitted On</td>
                  <td class="summary-value">${new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                </tr>
              </table>
              <div class="msg-preview-wrapper">
                <span class="msg-preview-label">Your Message</span>
                <div class="msg-preview">${message}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} CiploStem Medical Affairs &middot; All rights reserved.<br>
            Cipla Ltd &middot; Peninsula Business Park, Lower Parel, Mumbai
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const userResult = await sendEmail(
        email,
        `Thank you for contacting CiploStem (Inquiry #${dbResult.insertId})`,
        userConfirmationHtml
      );
      console.log(`[Contact] User confirmation email sent to ${email} - MessageID: ${userResult.messageId}`);
    } catch (emailErr) {
      console.error(`[Contact] FAILED to send user confirmation email to ${email}:`, emailErr.message);
    }

    res.status(201).json({ 
      success: true,
      message: 'Contact form submitted successfully! A confirmation email has been sent to your inbox.',
      inquiryId: dbResult.insertId
    });
  } catch (error) {
    console.error('[Contact] FATAL error submitting contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, we could not submit your message at this time. Please try again later or email us directly at support@coact.co.in.'
    });
  }
});

// Get all contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Delete contact by ID
app.delete('/api/admin/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

// Download contacts as CSV
app.get('/api/admin/contacts/download', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(rows);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('contacts.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading contacts:', error);
    res.status(500).json({ message: 'Failed to download contacts' });
  }
});

// Admin: Get all registered doctors
app.get('/api/admin/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email, city, phone, mci_code, is_verified, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch registered doctors' });
  }
});

// Admin: Delete registered doctor by ID
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [userRows] = await pool.query('SELECT email FROM users WHERE id = ?', [id]);
    if (userRows.length > 0) {
      await pool.query('DELETE FROM otps WHERE email = ?', [userRows[0].email]);
    }
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ success: true, message: 'Doctor registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor registration:', error);
    res.status(500).json({ success: false, message: 'Failed to delete doctor registration' });
  }
});

// Admin: Download registered doctors as CSV
app.get('/api/admin/users/download', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email, city, phone, mci_code, is_verified, created_at FROM users ORDER BY created_at DESC');
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(rows);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('registered_doctors.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading users:', error);
    res.status(500).json({ message: 'Failed to download registered doctors' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CiploStem Backend API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
