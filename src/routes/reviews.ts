import express from 'express'
import { AppDataSource } from '../data-source'
import { Review } from '../entities/Review'

const router = express.Router()

router.get('/reviews/:productId', async (req, res) => {
    try {
        if (!req.query.rating)
            return res.status(400).json({
                error: 'Rating is required, specify it in a query param reviews/:productId?rating=5',
            })

        const productId = parseInt(req.params.productId)
        const rating = parseInt(req.query.rating.toString())

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' })
        }
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res
                .status(400)
                .json({ error: 'Rating must be between 1 and 5' })
        }

        const reviews = await AppDataSource.manager.find(Review, {
            where: {
                product: { id: productId },
                rating: rating,
            },
            relations: ['product', 'customer'],
        })

        res.json(reviews)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Route to get all customers
router.post('/reviews', async (req, res) => {
    try {
        const { productId, customerId, rating, review } = req.body

        /* Will have a simple validation here,
         would normally setup a middleware for every route*/
        if (!productId || !customerId || !rating || !review)
            return res.status(400).json({ error: 'Bad Request' })

        if (rating < 1 || rating > 5)
            return res
                .status(400)
                .json({ error: 'Rating must be between 1 and 5' })

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
