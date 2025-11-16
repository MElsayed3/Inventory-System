// server/controllers/reportController.js

const db = require('../db');

// Function to get the current stock status for all items
async function getStockStatus(req, res) {
    try {
        // Query to select all items and use the PostgreSQL function to calculate their stock status
        // The function get_current_stock_status is executed for each item (by joining the Items table)
        const queryText = `
            SELECT
                I.item_code,
                I.item_name,
                I.item_unit,
                T.total_issued,
                T.total_returned_good,
                T.total_returned_damaged,
                T.total_returned_good AS available_good_stock,
                (T.total_issued - T.total_returned_good - T.total_returned_damaged) AS used_or_lost_stock
            FROM
                Items I
            JOIN
                LATERAL get_current_stock_status(I.item_code) AS T ON TRUE;
        `;
        
        const result = await db.query(queryText);

        res.json({
            message: 'Current stock report generated successfully.',
            data: result.rows
        });

    } catch (error) {
        console.error('Report generation error:', error.message);
        res.status(500).json({ message: 'Failed to generate stock report.' });
    }
}

module.exports = {
    getStockStatus
};