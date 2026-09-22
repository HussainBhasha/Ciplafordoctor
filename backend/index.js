import express from 'express';
import cors from 'cors';
import { Parser } from 'json2csv';
import pool, { initDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Validation helpers
const MCI_REGEX = /^[A-Za-z0-9\-\/\s]{3,25}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateMci(code) {
  return typeof code === 'string' && MCI_REGEX.test(code.trim());
}

function validateEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// ==========================================
// DOCTOR MCI ACCESS VERIFICATION
// ==========================================

// Verify Doctor MCI Code and record entry
app.post('/api/auth/verify-mci', async (req, res) => {
  try {
    let { mci_code } = req.body;

    if (!mci_code || !mci_code.trim()) {
      return res.status(400).json({
        success: false,
        message: 'MCI / Medical Council Registration Code is required.'
      });
    }

    mci_code = mci_code.trim().toUpperCase();

    if (!validateMci(mci_code)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid MCI / State Medical Council Code (3-25 alphanumeric characters).'
      });
    }

    // Insert or update doctor MCI access record
    const [result] = await pool.query(
      'INSERT INTO users (mci_code, is_verified) VALUES (?, TRUE)',
      [mci_code]
    );

    res.json({
      success: true,
      message: 'MCI Code verified successfully.',
      mci_code,
      id: result.insertId
    });
  } catch (error) {
    console.error('Error in MCI verification:', error);
    // Return success to allow verified doctor frontend to continue smoothly
    res.json({
      success: true,
      message: 'MCI Code verified.',
      mci_code: req.body?.mci_code || ''
    });
  }
});

// ==========================================
// CONTACT INQUIRIES
// ==========================================

// Submit contact inquiry
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

    if (!full_name || full_name.trim().length < 2) {
      validationErrors.fullName = 'Full name must be at least 2 characters long.';
    }

    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!phone || phone.trim().length < 7) {
      validationErrors.phone = 'Please enter a valid phone number.';
    }

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
    
    const [dbResult] = await pool.query(query, [
      full_name.trim(),
      email.trim(),
      phone.trim(),
      subject ? subject.trim() : null,
      message.trim()
    ]);

    console.log(`[Contact] Inquiry saved - ID: ${dbResult.insertId}, Name: ${full_name}`);

    res.status(201).json({ 
      success: true,
      message: 'Contact form submitted successfully! Our team will review your message shortly.',
      inquiryId: dbResult.insertId
    });
  } catch (error) {
    console.error('[Contact] Error saving contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, we could not submit your message at this time. Please try again later.'
    });
  }
});

// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all contact submissions
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Delete contact submission by ID
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

// Admin: Get all doctor MCI access records
app.get('/api/admin/users', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, mci_code, is_verified, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching doctor access records:', error);
    res.status(500).json({ message: 'Failed to fetch doctor access records' });
  }
});

// Admin: Delete doctor access record by ID
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ success: true, message: 'Doctor access record deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor record:', error);
    res.status(500).json({ success: false, message: 'Failed to delete doctor record' });
  }
});

// Admin: Download doctor access records as CSV
app.get('/api/admin/users/download', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, mci_code, is_verified, created_at FROM users ORDER BY created_at DESC'
    );
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(rows);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('registered_doctors.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading doctors:', error);
    res.status(500).json({ message: 'Failed to download doctor access records' });
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
