import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Weather } from "./Weather";

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Weather, (weather) => weather.place, {
        onDelete: "CASCADE"
    })
    weathers: Weather[];

    @Column({
        type: "varchar",
        length: 100
    })
    city: string;

    @Column({
        type: "varchar",
        length: 100
    })
    country: string;
}
