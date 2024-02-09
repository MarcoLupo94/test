import express from 'express'
import { Customer } from '../entities/Customer'
import { AppDataSource } from '../data-source'
import { Review } from '../entities/Review'

const router = express.Router()

// Route to get all customers
router.post('/reviews', async (req, res) => {
    try {
        const { productId, customerId, rating, review } = req.body

        /* Will have a simple validation here,
         would normally setup a middleware for every route*/
        if (!productId || !customerId || !rating || !review)
            return res.status(400).json({ error: 'Bad Request' })

        const newReview = AppDataSource.manager.create(Review, {
            rating,
            review,
            product: { id: productId },
            customer: { id: customerId },
        })
        await AppDataSource.manager.save(newReview)

        res.status(201).json(review)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router
