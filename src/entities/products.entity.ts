import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UsersEntity from './user.entity';

@Entity('products')
export default class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    price: number;

    @Column('int', { nullable: false })
    @ManyToOne(() => UsersEntity, (user) => user.id)
    @JoinColumn({ name: 'user' })
    user: UsersEntity
}
