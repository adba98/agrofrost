export class Market {

    public title: string;
    public description: string;
    public lat: number;
    public long: number;
    constructor(
        title: string = "",
        description: string = "",
        lat: number = 4.6228,
        long: number = -74.091
    ) {

        this.title = title;
        this.description = description;
        this.lat = lat;
        this.long = long;


    }

}