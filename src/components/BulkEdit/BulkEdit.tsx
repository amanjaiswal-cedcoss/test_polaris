import { FullscreenBar, Button, Text, Icon, IndexTable, Popover, OptionList, ButtonGroup } from '@shopify/polaris';
import { Columns3Major } from '@shopify/polaris-icons';
import { memo, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { columnData } from '../../Constant';
import { ProductContext } from '../../context/ProductsContext';
import { IndexTableHeading } from '@shopify/polaris/build/ts/src/components/IndexTable';
import EditRow from './components/EditRow';

const BulkEdit = () => {
    const { products, updateProducts, selectedProducts } = useContext(ProductContext);
    const [editProducts, setEditProducts] = useState<any[]>(
        selectedProducts!.map((ele) => {
            return {
                ...products?.find((innerEle) => innerEle.id.toString() === ele),
            };
        })
    );
    const [columns, setColumns] = useState(
        columnData.map((ele) => {
            return ele.key;
        })
    );
    const [isColumnPopoverActive, setIsColumnPopoverActive] = useState(false);
    const [changesPending, setChangesPending] = useState(false);

    /**
     * to update value of any key in any product
     * @param index index of that product
     * @param key name of key whose value is to be changed
     * @param value updated value
     */
    const changeHandlerProduct = (index: number, key: string, value: string | boolean | string[]) => {
        !changesPending && setChangesPending((prev) => true);
        setEditProducts((prev) => {
            prev[index][key] = value;
            return prev;
        });
    };

    /**
     * mapping all the changes done in edit products to the context products array
     */
    const saveProducts = useCallback(() => {
        const tempProducts = products?.map((ele) => {
            let obj = editProducts.find((findEle) => findEle.id === ele.id);
            return obj ? { ...obj } : { ...ele };
        });
        updateProducts!(tempProducts!);
        setChangesPending((prev) => false);
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <div className="fullscr-bar">
                <FullscreenBar
                    onAction={() => {
                        navigate(-1);
                    }}>
                    <div className="fullscr-bar__nav">
                        <Text as="h5" variant="headingSm">
                            Editing {selectedProducts?.length} Products
                        </Text>
                        <ButtonGroup>
                            <Popover
                                activator={
                                    <Button
                                        plain
                                        monochrome
                                        removeUnderline
                                        icon={<Icon source={Columns3Major} />}
                                        onClick={() => {
                                            setIsColumnPopoverActive((prev) => !prev);
                                        }}>
                                        Columns
                                    </Button>
                                }
                                active={isColumnPopoverActive}
                                onClose={() => {
                                    setIsColumnPopoverActive((prev) => !prev);
                                }}>
                                <OptionList
                                    allowMultiple
                                    onChange={(val) => {
                                        setColumns((prev) =>
                                            columnData.filter((ele) => val.includes(ele.key)).map((ele) => ele.key)
                                        );
                                    }}
                                    selected={columns}
                                    options={columnData.map((ele) => {
                                        return {
                                            label: ele.name,
                                            value: ele.key,
                                            id: ele.id.toString(),
                                            disabled: ele.id === 0,
                                        };
                                    })}
                                />
                            </Popover>
                            <Button size="slim" onClick={saveProducts} disabled={!changesPending}>
                                Save
                            </Button>
                        </ButtonGroup>
                    </div>
                </FullscreenBar>
            </div>
            <div className="bulkedit-grid">
                <IndexTable
                    itemCount={editProducts.length}
                    hasMoreItems
                    headings={[
                        { title: columnData[0].name },
                        ...columnData
                            .slice(1, columnData.length)
                            .filter((ele) => columns.includes(ele.key))
                            .map((ele) => {
                                let obj: IndexTableHeading = { title: ele.name };
                                return obj;
                            }),
                    ]}
                    selectable={false}>
                    {editProducts.map((ele: any, index) => {
                        const variants = products?.filter(
                            (element) => ele.id !== element.id && ele.title !== '' && ele.handle === element.handle
                        );
                        return (
                            <EditRow
                                element={ele}
                                index={index}
                                changeHandlerProduct={changeHandlerProduct}
                                editProducts={editProducts}
                                key={ele.id}
                                columns={columns}
                                hasVariant={variants!.length > 0}
                            />
                        );
                    })}
                </IndexTable>
            </div>
        </>
    );
};

export default memo(BulkEdit);
