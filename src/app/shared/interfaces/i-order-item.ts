import {IItems} from '@shared/interfaces/i-items';

export interface IOrderItems {
    order_item_id: number;
    item_id: number;
    quantity: number;
    items: IItems;
    order_id: number;
  }
