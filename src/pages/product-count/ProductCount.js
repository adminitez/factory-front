import React, {useEffect, useState }  from 'react';
import ProductCountTable from '../../components/ProductCountTable'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import api from '../../services/Api'


const ProductCountPage = () => {
  
      const { purchaseOrderId } = useParams();
      const [ state, setState ] = useState({
        purchaseOrder: null
      });

      
      useEffect(()=> {
        loadPurchaseOrder();        
    }, [])

    const loadPurchaseOrder = async () => {
        const response = await api.get('/purchase-orders/'+purchaseOrderId);
        setState({
            purchaseOrder: response.data,
        })
    };
      
    if(!purchaseOrderId) return null;

    if(state.purchaseOrder === null){
      return (
        <CircularProgress />
      )
    }
    return (
      <ProductCountTable purchaseOrder={state.purchaseOrder}/>
    );
  
}

export default ProductCountPage