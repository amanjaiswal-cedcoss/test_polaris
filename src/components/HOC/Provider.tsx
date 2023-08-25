import React, { useMemo, ReactNode, useState } from 'react';
import { ProductContext } from '../../context/ProductsContext';
import { productsData } from '../../Constant';
/**
 * HOC to provide context states to all the child components
 */
const Provider = ({ children }: { children: ReactNode }) => {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [products, setProducts] = useState([...productsData]);
    const valueObj = useMemo(
        () => ({
            products,
            updateProducts: (arr: any[]) => {
                setProducts([...arr]);
            },
            selectedProducts,
            updateSelectedProducts: (arr: string[]) => {
                setSelectedProducts([...arr]);
            },
        }),
        [selectedProducts, products]
    );
    return <ProductContext.Provider value={valueObj}>{children}</ProductContext.Provider>;
};

export default Provider;
