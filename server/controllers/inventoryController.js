// server/controllers/inventoryController.js

const db = require('../db');

// --- 1. Issue Transaction (عملية الصرف) ---
// Only 'مخزن' role can perform issue transactions 
async function issueItem(req, res) {
    // The issuer is retrieved from the token 
    const issuer_code = req.user.employeeCode; 
    const { item_code, issued_quantity } = req.body;

    if (!item_code || !issued_quantity || issued_quantity <= 0) {
        return res.status(400).json({ message: 'Missing item code or invalid quantity.' });
    }

    try {
        // Simple check if item exists 
        const itemCheck = await db.query('SELECT item_code FROM Items WHERE item_code = $1', [item_code]);
        if (itemCheck.rows.length === 0) {
             return res.status(404).json({ message: 'Item code not found.' });
        }

        // Insert into Issue_Transactions 
        const result = await db.query(
            'INSERT INTO Issue_Transactions (item_code, issued_quantity, issuer_code) VALUES ($1, $2, $3) RETURNING issue_id',
            [item_code, issued_quantity, issuer_code]
        );

        res.status(201).json({ 
            message: 'Issue transaction recorded successfully.', 
            issueId: result.rows[0].issue_id 
        });

    } catch (error) {
        console.error('Issue error:', error.message);
        res.status(500).json({ message: 'Failed to record issue transaction.' });
    }
}


// --- 2. Return Transaction ---
// Only 'صيانة' role can perform return transactions 
async function returnItem(req, res) {
    // The receiver (from maintenance) is retrieved from the token 
    const receiver_code = req.user.employeeCode;
    const { item_code, returned_quantity, return_status } = req.body; // return_status MUST be 'سليم' or 'تالف'

    if (!item_code || !returned_quantity || returned_quantity <= 0 || !['سليم', 'تالف'].includes(return_status)) {
        return res.status(400).json({ message: 'Missing item code, invalid quantity, or invalid status (must be سليم or تالف).' });
    }

    try {
        // Insert into Return_Transactions 
        const result = await db.query(
            'INSERT INTO Return_Transactions (item_code, returned_quantity, return_status, receiver_code) VALUES ($1, $2, $3, $4) RETURNING return_id',
            [item_code, returned_quantity, return_status, receiver_code]
        );

        res.status(201).json({ 
            message: 'Return transaction recorded successfully.', 
            returnId: result.rows[0].return_id 
        });

    } catch (error) {
        console.error('Return error:', error.message);
        res.status(500).json({ message: 'Failed to record return transaction.' });
    }
}

module.exports = { 
    issueItem, 
    returnItem 
};