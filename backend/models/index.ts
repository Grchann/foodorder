import { DBFood } from "./food";
import { DBCategory } from "./category";
import { DBCart } from './cart';
import { DBOffer } from './offer';
import { DBOrder } from './order';
import { DBRestaurant } from './restaurant';
import { DBUser } from './user';

export type DBObject = DBFood | DBCategory | DBCart | DBOffer | DBOrder | DBRestaurant | DBUser;
