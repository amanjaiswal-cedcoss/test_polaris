import { createContext } from 'react';

export const ProductContext = createContext<{
    products?:any[];
    updateProducts?: (arr: any[]) => void;
    selectedProducts?: String[];
    updateSelectedProducts?: (arr: string[]) => void;
}>({});
