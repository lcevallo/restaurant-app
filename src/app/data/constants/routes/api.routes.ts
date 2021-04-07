import  {environment as ENV} from 'environments/environment';

export const API_ROUTES = {
    ITEMS : {
        ITEM: `${ENV.baseUrl}item`,
        LISTA : `${ENV.baseUrl}items`
    },
    CLIENTES: {
            LISTA : `${ENV.baseUrl}customers`
    },
    ORDER:{
        LISTA:`${ENV.baseUrl}orders`
    }

}