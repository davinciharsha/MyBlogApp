import { Photo } from './photo';

export interface User {
    id: number;
    userName: string;
    gender: string;
    age: number;
    knownAs: string;
    createdDateTime: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
