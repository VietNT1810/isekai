import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as productsService from '@/services/productsService';

function ProductPage(props) {
    const params = useParams();
    const [product, setProducts] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            await productsService
                .getProduct(params.slug)
                .then((res) => {
                    setProducts(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchProduct();
    }, []);

    return (
        <div>
            {console.log(product)}
            ProductPage
        </div>
    );
}

export default ProductPage;
