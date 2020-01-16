import React, {useEffect, useState }  from 'react';
import ProductCountTable from '../../components/ProductCountTable'
import { useParams } from 'react-router-dom';
import api from '../../services/Api'


const ProductCountPage = async () => {
  
      const { purchaseOrderId } = useParams();
      const [state, setState] = useState({
        purchaseOrder: {}
      });

      
      useEffect(()=> {
        loadPurchaseOrder();        
    }, [])

    const loadPurchaseOrder = async () => {
        console.log()
        const response = await api.get('/purchase-orders/'+purchaseOrderId);
        setState({
            purchaseOrder: response.data,
        })
        console.log(response.data)
        // actions.setPurchaseOrders(response.data.purchaseOrders)
    };
      
    if(!purchaseOrderId) return null;

    //   const purchaseOrder = store.purchaseOrders.find(purchaseOrder => purchaseOrder.purchaseOrderId)
      return (
      <ProductCountTable purchaseOrder={state.purchaseOrder}/>
    );
  
}

export default ProductCountPage