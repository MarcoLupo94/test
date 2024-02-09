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
    @JoinColumn()
    product: Product

    @ManyToOne(() => Customer)
    @JoinColumn()
    customer: Customer
}
