import { DBFood } from "./food";
import { DBCategory } from "./category";
import { DBCart } from './cart';
import { DBOffer } from './offer';
import { DBOrder } from './order';
import { DBRestaurant } from './restaurant';
import { DBUser } from './user';

export interface LatLng{
    lat: number,
    lng: number
}

export interface TextValue{
    text: string,
    value: number
}
export interface FetchRoute{
    bounds: {
        northeast: LatLng,
        southwest: LatLng
    },
    legs: [
        {
            distance: TextValue,
            duration: TextValue,
            end_address : string,
            end_location : LatLng,
            start_address : string,
            start_location : LatLng,
            steps : [
                {
                   distance : TextValue,
                   duration : TextValue,
                   end_location : TextValue,
                   html_instructions : string,
                   polyline : {
                      points : string
                   },
                   start_location : LatLng
                   travel_mode : string
                },
            ]
            traffic_speed_entry : [any],
            via_waypoint : [any]
        }
    ]
}

export interface AvailableRoute{
    bounds: {
        northeast: LatLng,
        southwest: LatLng
    },
    legs: [
        {
            distance: TextValue,
            duration: TextValue,
            end_address : string,
            end_location : LatLng,
            start_address : string,
            start_location : LatLng,
            steps : [
                {
                   distance : TextValue,
                   duration : TextValue,
                   end_location : TextValue,
                   html_instructions : string,
                   polyline : {
                      points : string
                   },
                   start_location : LatLng
                   travel_mode : string
                },
            ]
            traffic_speed_entry : [any],
            via_waypoint : [any]
        }
    ],
    totalDistance: number,
    totalDuration: number,
    idRestaurant: string,
}

export interface FetchDirectionResponse{
    routes: [FetchRoute],
    status: string
}

export type DBObject = DBFood | DBCategory | DBCart | DBOffer | DBOrder | DBRestaurant | DBUser;
