import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm'
import { Product } from './Product'
import { Customer } from './Customer'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    review: string

    @Column({ type: 'int' })
    rating: number

    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product

    @ManyToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @BeforeInsert()
    @BeforeUpdate()
    validateRating() {
        if (this.rating < 1 || this.rating > 5) {
            throw new Error('Rating must be between 1 and 5')
        }
    }
}
