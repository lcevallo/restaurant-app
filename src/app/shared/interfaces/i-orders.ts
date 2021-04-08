import {IOrderItems} from '@shared/interfaces/i-order-item';

export interface IOrders {
    order_id: number;
    order_no: string;
    p_method: string;
    g_total: number;
    customer_id: number;
    deletedOrderItemsIDs?: string;
    order_items: IOrderItems[];
  }
