import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'int' })
    rating: number
}
