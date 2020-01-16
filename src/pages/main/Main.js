import React, { useEffect, useState }  from 'react';
import PurchaseOrderTable from '../../components/PurchaseOrderTable'
import api from '../../services/Api'

const Main = () => {

    const [state, setState] = useState({
        purchaseOrders: [],
        page: 1,
        loading: true
    });

    useEffect(()=> {
        loadPurchaseOrders();        
    }, [])

    const loadPurchaseOrders = async () => {
        const response = await api.get('/purchase-orders?page=1&size=50');
        setState({
            purchaseOrders: response.data.purchaseOrders,
            page: response.data.page,
            loading: false
        })
    };
  
    return (
      <PurchaseOrderTable purchaseOrders={state.purchaseOrders} page={state.page} loading={state.loading} />
    );
}

    export default Main
