import express from 'express'
import { sql } from '../config/db.js';
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from '../controllers/transactionsController.js';

const router = express.Router();

//create transaction 
router.post('/', createTransaction)
//get all
router.get('/', async (req, res) => {
    try {
        const result = await sql`select * from transactions`
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})
//get summary by user id
router.get('/summary/:Id', getSummaryByUserId)
// get specific transaction by userId
router.get('/:Id', getTransactionsByUserId)
// delete specific 
router.delete('/:Id', deleteTransaction)

export default router;