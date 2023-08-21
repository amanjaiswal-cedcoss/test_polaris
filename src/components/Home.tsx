import {
    ActionList,
    Frame,
    Layout,
    Navigation,
    Page,
    TextField,
    TopBar,
    Button,
    Form,
    Card,
    DropZone,
    VerticalStack,
    Checkbox,
    Select,
    Text,
    HorizontalStack,
    Icon,
    IndexTable,
    Badge,
    useIndexResourceState,
} from '@shopify/polaris';
import {
    HomeMajor,
    OrdersMajor,
    ProductsMajor,
    ReturnsMajor,
    ActivitiesMajor,
    QuestionMarkMajor,
    MobileVerticalDotsMajor,
} from '@shopify/polaris-icons';
import { useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
type InputKeysT = 'title' | 'status' | 'price' | 'comparePrice' | 'onlineStore' | 'pointOfSale' | 'indAndInt';
const Home = () => {
    const defaultState = useRef({
        emailFieldValue: 'amanjaiswal@cedcommerce.com',
        nameFieldValue: 'Aman Jaiswal',
    });
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [state, setState] = useState({
        title: '',
        status: 'active',
        price: '',
        comparePrice: '',
        onlineStore: false,
        pointOfSale: false,
        indAndInt: false,
    });
    const handleChange = (key: InputKeysT, value: string | boolean) => {
        setState((prev) => {
            let obj= Object.assign(prev, { [key]: value });
            return {...obj};
        });
    };
    const handleSearchResultsDismiss = useCallback(() => {
        setSearchActive(false);
        setSearchValue('');
    }, []);
    const handleSearchFieldChange = useCallback((value: string) => {
        setSearchValue(value);
        setSearchActive(value.length > 0);
    }, []);
    const toggleUserMenuActive = useCallback(() => setUserMenuActive((userMenuActive) => !userMenuActive), []);

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[]}
            name="Aman Jaiswal"
            detail={defaultState.current.nameFieldValue}
            initials="AJ"
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );

    const searchResultsMarkup = (
        <ActionList items={[{ content: 'Shopify help center' }, { content: 'Community forums' }]} />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField onChange={handleSearchFieldChange} value={searchValue} placeholder="Search" />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            searchResultsVisible={searchActive}
            searchField={searchFieldMarkup}
            searchResults={searchResultsMarkup}
            onSearchResultsDismiss={handleSearchResultsDismiss}
        />
    );
    const location = useLocation();
    const navigationMarkup = (
        <Navigation location={location.pathname.substring(1,location.pathname.length)}>
            <Navigation.Section
                items={[
                    {
                        label: 'Dashboard',
                        icon: HomeMajor,
                        url: 'dashboard',
                    },
                    {
                        label: 'Products',
                        icon: ProductsMajor,
                        url: 'products',
                    },
                    {
                        label: 'Orders',
                        icon: OrdersMajor,
                        badge: '10',
                        url: 'orders',
                    },
                    {
                        label: 'Returns',
                        icon: ReturnsMajor,
                        url: 'returns',
                    },

                    {
                        label: 'Activities',
                        icon: ActivitiesMajor,
                        url: 'activities',
                    },
                    {
                        label: 'Help',
                        icon: QuestionMarkMajor,
                        url: 'help',
                    },
                ]}
            />
        </Navigation>
    );

    const logo = {
        width: 124,
        topBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: '#',
        accessibilityLabel: 'Jaded Pixel',
    };

    const handleDropZoneDrop = useCallback((_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
        return setFiles((files) => [...files, ...acceptedFiles]);
    }, []);

    const orders = [
        {
            id: '1020',
            order: '#1020',
            date: 'Jul 20 at 4:34pm',
            customer: 'Jaydon Stanton',
            total: '$969.44',
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: '1019',
            order: '#1019',
            date: 'Jul 20 at 3:46pm',
            customer: 'Ruben Westerfelt',
            total: '$701.19',
            paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: '1018',
            order: '#1018',
            date: 'Jul 20 at 3.44pm',
            customer: 'Leo Carder',
            total: '$798.24',
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
    ];
    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);

    const rowMarkup = orders.map(({ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index) => (
        <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="bold" as="span">
                    {order}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{customer}</IndexTable.Cell>
            <IndexTable.Cell>{total}</IndexTable.Cell>
            <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
            <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        </IndexTable.Row>
    ));
    return (
        <Frame logo={logo} topBar={topBarMarkup} navigation={navigationMarkup}>
            <Page
                backAction={{ url: '#' }}
                title="Products"
                fullWidth
                primaryAction={{ content: 'Create' }}
                secondaryActions={<Button>Guide</Button>}>
                <Layout>
                    <Layout.Section oneHalf>
                        <VerticalStack gap="5">
                            <Card>
                                <Form onSubmit={() => {}}>
                                    <TextField
                                        label="Title"
                                        type="text"
                                        autoComplete="text"
                                        value={state.title}
                                        onChange={(value) => {
                                            handleChange('title', value);
                                        }}
                                    />
                                </Form>
                            </Card>
                            <Card>
                                <VerticalStack gap="3">
                                    <Text alignment="start" variant="headingSm" as="h2">
                                        Media
                                    </Text>
                                    <HorizontalStack gap="4">
                                        {files.map((file, index) => (
                                            <img
                                                key={file.name}
                                                height={50}
                                                alt={file.name}
                                                src={window.URL.createObjectURL(file)}
                                            />
                                        ))}
                                    </HorizontalStack>
                                    <DropZone dropOnPage onDrop={handleDropZoneDrop} label="Media" labelHidden>
                                        <div className="cent">
                                            <Button size="slim">Add Files</Button>
                                        </div>
                                    </DropZone>
                                </VerticalStack>
                            </Card>
                            <Card>
                                <VerticalStack gap="3">
                                    <Text alignment="start" variant="headingSm" as="h2">
                                        Pricing
                                    </Text>
                                    <HorizontalStack gap="3">
                                        <TextField
                                            label="Price"
                                            autoComplete=""
                                            suffix={<Icon source={QuestionMarkMajor} color="base" />}
                                            value={state.price}
                                            onChange={(value) => {
                                                handleChange('price', value);
                                            }}
                                        />
                                        <TextField
                                            label="Compare-at price"
                                            autoComplete=""
                                            value={state.comparePrice}
                                            onChange={(value) => {
                                                handleChange('comparePrice', value);
                                            }}
                                        />
                                    </HorizontalStack>
                                </VerticalStack>
                            </Card>
                        </VerticalStack>
                    </Layout.Section>
                    <Layout.Section oneThird>
                        <VerticalStack gap="5">
                            <Card>
                                <VerticalStack gap="3">
                                    <Text alignment="start" variant="headingSm" as="h2">
                                        Status
                                    </Text>
                                    <Select
                                        label="Status"
                                        labelHidden
                                        options={[
                                            { label: 'Active', value: 'active' },
                                            { label: 'Draft', value: 'draft' },
                                        ]}
                                        value={state.status}
                                        onChange={(value) => {
                                            handleChange('status', value);
                                        }}
                                    />
                                </VerticalStack>
                            </Card>
                            <Card>
                                <VerticalStack gap="3">
                                    <HorizontalStack align="space-between">
                                        <Text alignment="start" variant="headingSm" as="h2">
                                            Publishing
                                        </Text>
                                        <Button plain monochrome icon={MobileVerticalDotsMajor}></Button>
                                    </HorizontalStack>
                                    <VerticalStack gap="2">
                                        <Text alignment="start" fontWeight="medium" variant="bodyMd" as="p">
                                            Sales channels
                                        </Text>
                                        <VerticalStack gap="1">
                                            <Checkbox
                                                checked={state.onlineStore}
                                                label="Online Store"
                                                onChange={() => {
                                                    handleChange('onlineStore', !state.onlineStore);
                                                }}
                                            />
                                            <Checkbox
                                                label="Point of Sale"
                                                checked={state.pointOfSale}
                                                onChange={() => {
                                                    handleChange('pointOfSale', !state.pointOfSale);
                                                }}
                                            />
                                        </VerticalStack>
                                    </VerticalStack>
                                    <VerticalStack gap="2">
                                        <Text alignment="start" fontWeight="medium" variant="bodyMd" as="p">
                                            Markets
                                        </Text>
                                        <VerticalStack gap="1">
                                            <Checkbox
                                                label="India and International"
                                                checked={state.indAndInt}
                                                onChange={() => {
                                                    handleChange('indAndInt', !state.indAndInt);
                                                }}
                                            />
                                        </VerticalStack>
                                    </VerticalStack>
                                </VerticalStack>
                            </Card>
                        </VerticalStack>
                    </Layout.Section>
                    <Layout.Section fullWidth>
                        <Card>
                            <IndexTable
                                sortable={[true, false, true, false, true]}
                                sortDirection="ascending"
                                hasZebraStriping
                                onSort={(sort, sel) => {
                                    console.log(sort, sel);
                                }}
                                resourceName={resourceName}
                                itemCount={orders.length}
                                selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                                onSelectionChange={handleSelectionChange}
                                headings={[
                                    { title: 'Order' },
                                    { title: 'Date' },
                                    { title: 'Customer' },
                                    { title: 'Total', alignment: 'end' },
                                    { title: 'Payment status' },
                                    { title: 'Fulfillment status' },
                                ]}
                                lastColumnSticky>
                                {rowMarkup}
                            </IndexTable>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    );
};

export default Home;
