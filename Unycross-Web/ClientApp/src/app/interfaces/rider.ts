export interface Racer {
    name: string;
    slug: string;
    state: string;
    city: string;
}

export interface RacerProfile{
    birthdate: string;
    city: string;
    firstName: string;
    lastName: string;
    homeTown: string;
    amaNumber: string;
    slug: string;
    state: string;
    class: string;
    raceResults: RacerProfileRaceResult[];
}

export interface RacerProfileRaceResult{
    class: string;
    position: number;
    dateString: string;
}

export interface Event{
    dateString: string;
    eventName: string;
    trackName: string;
    eventSlug: string;
    id: number;
    city: string;
    district: string;
    year: string;
    state: string;
    class: string;
    racerName: string;
    amaNumber: string;
    moto1Result: string;
    moto2Result: string;
    overallResult: string;
    eventPoints: string;
    classSlug: string;
}

export interface Points{
    class: string;
    points: number;
    raceCount: number;
    rpv: number;
}