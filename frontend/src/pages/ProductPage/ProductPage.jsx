import React from 'react';
import { useParams } from 'react-router-dom';

function ProductPage(props) {
    const productId = useParams();

    return (
        <div>
            {console.log(productId)}
            ProductPage
        </div>
    );
}

export default ProductPage;
