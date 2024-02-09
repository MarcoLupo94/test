import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'float' })
    price: number

    @Column({ type: 'float' })
    stock: number

    @Column({ type: 'text' })
    size: string
}
