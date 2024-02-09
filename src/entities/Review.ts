import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Product } from './Product'
import { Customer } from './Customer'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'int' })
    rating: number

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product

    @ManyToOne(() => Customer, (customer) => customer.reviews)
    customer: Customer
}
