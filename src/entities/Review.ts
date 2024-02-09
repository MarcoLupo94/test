import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
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
    @JoinColumn({ name: 'productId' })
    product: Product

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customerId' })
    customer: Customer
}
