import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Place } from "./Place";

@Entity()
export class Weather {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Place, (place) => place.weathers)
    @JoinColumn({ name: "place_id" })
    place: Place;
    @Column()
    place_id: number;

    @Column({
        type: "datetime"
    })
    datetime: Date;

    @Column({
        type: "integer",
        default: 0
    })
    temperature: number;

    @Column({
        type: "integer",
        default: 0
    })
    temperature_feels: number;

    @Column({
        type: "integer",
        default: 0
    })
    precipitation: number;

    @Column({
        type: "integer",
        default: 0
    })
    humidity: number;

    @Column({
        type: "integer",
        default: 0
    })
    wind_speed: number;
}
