import express from 'express'
import { Customer } from '../entities/Customer'
import { AppDataSource } from '../data-source'

const router = express.Router()

// Route to get all customers
router.get('/reviews', async (req, res) => {
    try {
        const customers = await AppDataSource.manager.find(Customer)
        res.json(customers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router
