import {
    Autocomplete,
    Badge,
    Checkbox,
    HorizontalStack,
    Icon,
    IndexTable,
    OptionList,
    Popover,
    Select,
    Tag,
    TextField,
    Thumbnail,
} from '@shopify/polaris';
import { memo, useState } from 'react';
import { getStatusBadge } from '../../../utils/Utils';
import { SelectMinor } from '@shopify/polaris-icons';
import {
    countriesListOptions,
    productTypesOptions,
    tagOptions,
    vendorOptions,
    weightUnitOptions,
} from '../../../Constant';
type PropsT = {
    element: any;
    index: number;
    changeHandlerProduct: (index: number, key: string, value: string | boolean | string[]) => void;
    editProducts: any[];
    columns: string[];
    hasVariant: boolean;
};
const EditRow = ({ element, index, changeHandlerProduct, editProducts, columns, hasVariant }: PropsT) => {
    const [tag, setTag] = useState('');
    const [item, setItem] = useState<any>(element);
    const isVariant = element.title === '';
    /**
     * to update the changes in local object state and also trigger updating them in context products array
     * @param key name of key whose value is to be changed
     * @param value updated value
     */
    const localChangeHandler = (key: string, value: string | boolean | string[]) => {
        setItem((prev: any) => {
            let newItem = { ...prev, [key]: value };
            return newItem;
        });
        changeHandlerProduct(index, key, value);
    };

    /**
     * to toggle adding and deleting of tags in a product in local state and triggering the update in context product array
     * @param tag name tag to be added or removed
     */
    const localTagsToggle = (tag: string) => {
        let tempTags: string[] = [];
        if (editProducts[index].tags.includes(tag)) {
            tempTags = editProducts[index].tags.filter((ele: any) => ele !== tag);
        } else {
            tempTags = [...editProducts[index].tags, tag];
        }
        setItem((prev: any) => {
            let newItem = { ...prev, tags: [...tempTags] };
            return newItem;
        });
        changeHandlerProduct(index, 'tags', tempTags);
    };
    /**
     * object containing the UI for different columns for table
     */
    const rowMarkupObj: any = {
        title: (
            <HorizontalStack gap={'2'} wrap={false}>
                {!isVariant && <Thumbnail alt="" source={item.img} size="extraSmall" />}
                <TextField
                    borderless
                    autoComplete="off"
                    labelHidden
                    label=""
                    onChange={(val) => localChangeHandler('title', val)}
                    value={isVariant ? item.variant_title : item.title}
                    readOnly={isVariant}
                />
            </HorizontalStack>
        ),
        tags: isVariant ? (
            <Badge />
        ) : (
            <div className="autocomp-tags">
                <Autocomplete
                    allowMultiple
                    options={tagOptions}
                    selected={item.tags}
                    textField={
                        <Autocomplete.TextField
                            onChange={(val) => setTag(val)}
                            label=""
                            labelHidden
                            value={tag}
                            placeholder="Type to add tags"
                            verticalContent={
                                item.tags.length > 0 ? (
                                    <HorizontalStack gap={'1'}>
                                        {item.tags.map((option: string) => {
                                            return (
                                                <Tag key={option} onRemove={() => localTagsToggle(option)}>
                                                    {option}
                                                </Tag>
                                            );
                                        })}
                                    </HorizontalStack>
                                ) : null
                            }
                            autoComplete="off"
                        />
                    }
                    onSelect={(val) => localChangeHandler('tags', val)}
                    listTitle="Suggested Tags"
                />
            </div>
        ),
        status: isVariant ? (
            <Badge />
        ) : (
            <Popover
                activator={
                    <div
                        style={{ cursor: 'grab', display: 'flex', gap: 10 }}
                        onClick={() => {
                            localChangeHandler('isPopoverActive', !item.isPopoverActive);
                        }}>
                        {getStatusBadge(item.status)}
                        <Icon source={SelectMinor} />
                    </div>
                }
                active={item.isPopoverActive}
                onClose={() => {
                    localChangeHandler('isPopoverActive', !item.isPopoverActive);
                }}>
                <OptionList
                    onChange={(val) => localChangeHandler('status', val[0])}
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'archived', label: 'Archived' },
                        { value: 'draft', label: 'Draft' },
                    ]}
                    selected={item.status}
                />
            </Popover>
        ),
        type: isVariant ? (
            <Badge />
        ) : (
            <Autocomplete
                onSelect={(val) => localChangeHandler('type', val[0])}
                options={productTypesOptions}
                selected={item.type}
                textField={
                    <Autocomplete.TextField
                        onChange={(val) => localChangeHandler('type', val)}
                        label=""
                        labelHidden
                        value={item.type}
                        autoComplete="off"
                    />
                }
            />
        ),
        vendor: isVariant ? (
            <Badge />
        ) : (
            <Autocomplete
                onSelect={(val) => localChangeHandler('vendor', val[0])}
                options={vendorOptions}
                selected={item.vendor}
                textField={
                    <Autocomplete.TextField
                        onChange={(val) => localChangeHandler('vendor', val)}
                        label=""
                        labelHidden
                        value={item.vendor}
                        autoComplete="off"
                    />
                }
            />
        ),
        template: isVariant ? (
            <Badge />
        ) : (
            <Select
                value="product"
                labelHidden
                label=""
                onChange={() => {}}
                options={[{ label: 'product', value: 'product' }]}
            />
        ),
        included_india: isVariant ? (
            <Badge />
        ) : (
            <HorizontalStack align="center">
                <Checkbox
                    label=""
                    labelHidden
                    checked={item.included_india}
                    onChange={() => localChangeHandler('included_india', !editProducts[index].included_india)}
                />
            </HorizontalStack>
        ),
        included_international: isVariant ? (
            <Badge />
        ) : (
            <HorizontalStack align="center">
                <Checkbox
                    label=""
                    labelHidden
                    checked={item.included_international}
                    onChange={() =>
                        changeHandlerProduct(
                            index,
                            'included_international',
                            !editProducts[index].included_international
                        )
                    }
                />
            </HorizontalStack>
        ),
        base_price:
            isVariant || !hasVariant ? (
                <TextField
                    borderless
                    autoComplete="off"
                    labelHidden
                    label=""
                    value={item.base_price}
                    onChange={(val) => localChangeHandler('base_price', val)}
                />
            ) : (
                <Badge />
            ),
        compare_at_price:
            isVariant || !hasVariant ? (
                <TextField
                    borderless
                    autoComplete="off"
                    labelHidden
                    label=""
                    value={item.compare_at_price}
                    onChange={(val) => localChangeHandler('compare_at_price', val)}
                />
            ) : (
                <Badge />
            ),
        cost_per_item:
            isVariant || !hasVariant ? (
                <TextField
                    borderless
                    autoComplete="off"
                    labelHidden
                    label=""
                    value={item.cost_per_item}
                    onChange={(val) => localChangeHandler('cost_per_item', val)}
                />
            ) : (
                <Badge />
            ),
        is_taxable:
            isVariant || !hasVariant ? (
                <HorizontalStack align="center">
                    <Checkbox
                        label=""
                        labelHidden
                        checked={item.is_taxable}
                        onChange={() => localChangeHandler('is_taxable', !editProducts[index].is_taxable)}
                    />
                </HorizontalStack>
            ) : (
                <Badge />
            ),
        sku: (
            <TextField
                borderless
                autoComplete="off"
                labelHidden
                label=""
                value={item.sku}
                onChange={(val) => localChangeHandler('sku', val)}
            />
        ),
        barcode: (
            <TextField
                borderless
                autoComplete="off"
                labelHidden
                label=""
                value={item.barcode}
                onChange={(val) => localChangeHandler('barcode', val)}
            />
        ),
        inventory_qty:
            isVariant || !hasVariant ? (
                <TextField
                    borderless
                    autoComplete="off"
                    labelHidden
                    label=""
                    value={item.inventory_qty}
                    onChange={(val) => localChangeHandler('inventory_qty', val)}
                />
            ) : (
                <Badge />
            ),
        inventory_tracker:
            isVariant || !hasVariant ? (
                <HorizontalStack align="center">
                    <Checkbox
                        label=""
                        labelHidden
                        checked={item.inventory_tracker}
                        onChange={() => localChangeHandler('inventory_tracker', !editProducts[index].is_taxable)}
                    />
                </HorizontalStack>
            ) : (
                <Badge />
            ),
        weight_in_grams:
            isVariant || !hasVariant ? (
                <HorizontalStack wrap={false} gap={'2'}>
                    <TextField
                        borderless
                        autoComplete="off"
                        labelHidden
                        label=""
                        value={item.weight_in_grams}
                        onChange={(val) => localChangeHandler('weight_in_grams', val)}
                    />
                    <Select
                        value={item.weight_unit}
                        onChange={(val) => localChangeHandler('weight_unit', val)}
                        labelHidden
                        label=""
                        options={weightUnitOptions}
                    />
                </HorizontalStack>
            ) : (
                <Badge />
            ),
        requires_shipping:
            isVariant || !hasVariant ? (
                <HorizontalStack align="center">
                    <Checkbox
                        label=""
                        labelHidden
                        checked={item.requires_shipping}
                        onChange={() => localChangeHandler('requires_shipping', !editProducts[index].requires_shipping)}
                    />
                </HorizontalStack>
            ) : (
                <Badge />
            ),
        country_origin: isVariant || !hasVariant ? (
            <Select
                value={item.country_origin}
                label=""
                options={countriesListOptions}
                onChange={(val) => localChangeHandler('country_origin', val)}
            />
        ) : (
            <Badge />
        ),
        seo_title: isVariant ? (
            <Badge />
        ) : (
            <TextField
                borderless
                autoComplete="off"
                labelHidden
                label=""
                value={item.title}
                onChange={(val) => localChangeHandler('title', val)}
            />
        ),
        seo_description: isVariant ? (
            <Badge />
        ) : (
            <TextField
                borderless
                autoComplete="off"
                labelHidden
                label=""
                value={item.seo_decription}
                onChange={(val) => localChangeHandler('seo_decription', val)}
            />
        ),
    };

    return (
        <IndexTable.Row id={item.id.toString()} key={item.id.toString()} position={item.id}>
            {columns.map((item) => (
                <IndexTable.Cell key={item}>{rowMarkupObj[item]}</IndexTable.Cell>
            ))}
        </IndexTable.Row>
    );
};

export default memo(EditRow);
