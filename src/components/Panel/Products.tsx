import { IndexTable, useIndexResourceState, Text, Page, Card, Thumbnail } from '@shopify/polaris';
import  { useContext,  } from 'react';
import {  getStatusBadge } from '../../utils/Utils';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductsContext';

const Products = () => {
    const resourceName = {
        singular: 'product',
        plural: 'products',
    };
    const { products,updateSelectedProducts } = useContext(ProductContext);
    const uniqueProducts=products?.filter(ele=>ele.title!=='');
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(
        products!.map((ele) => {
            return { ...ele, id: ele.id.toString() };
        })
    );
    
    const rowMarkup = uniqueProducts?.map(
        ({ id, title, img, vendor, type, inventory_tracker, status, inventory_qty }, index) => (
            <IndexTable.Row
                id={id.toString()}
                key={id}
                selected={selectedResources.includes(id.toString())}
                position={index}>
                <IndexTable.Cell>
                    <Thumbnail alt="" source={img} size="small" />
                </IndexTable.Cell>
                <IndexTable.Cell>{title}</IndexTable.Cell>
                <IndexTable.Cell>
                    {getStatusBadge(status)}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" variant="bodyMd" color={inventory_tracker ?  'critical':'subdued'}>
                        {inventory_tracker? `${inventory_qty} in stock`:'Inventory Not Tracked'}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" variant="bodyMd" alignment="end">
                        2
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" variant="bodyMd" alignment="end">
                        2
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{type}</IndexTable.Cell>
                <IndexTable.Cell>{vendor}</IndexTable.Cell>
            </IndexTable.Row>
        )
    );
    const navigate = useNavigate();
    const promotedBulkActions = [
        {
            content: 'Bulk Edit',
            onAction: () => {
                updateSelectedProducts!(selectedResources);
                navigate('/bulk-edit');
            },
        },
    ];
    return (
        <Page title="Products" fullWidth>
            <Card>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={uniqueProducts!.length}
                    selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                    onSelectionChange={handleSelectionChange}
                    promotedBulkActions={promotedBulkActions}
                    headings={[
                        { title: '' },
                        { title: 'Product' },
                        { title: 'Status' },
                        { title: 'Inventory' },
                        { title: 'Sales Channel' },
                        { title: 'Markets' },
                        { title: 'Type' },
                        { title: 'Vendor' },
                    ]}>
                    {rowMarkup}
                </IndexTable>
            </Card>
        </Page>
    );
};

export default Products;
