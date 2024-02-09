import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    firstName: string

    @Column({ type: 'text' })
    lastName: string

    @Column({ type: 'text' })
    address: string
}
