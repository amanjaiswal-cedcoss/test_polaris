import './App.css';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Panel from './components/Panel/Panel';
import Dashboard from './components/Dashboard';
import Products from './components/Panel/Products';
import BulkEdit from './components/BulkEdit/BulkEdit';
import Provider from './components/HOC/Provider';

function App() {
    const Router = createBrowserRouter([
        {
            path: '/',
            element: <Panel />,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                },
                {
                    path: 'products',
                    element: <Products />,
                },
            ],
        },
        {
            path: '/bulk-edit',
            element: <BulkEdit />,
        },
    ]);
    return (
        <div className="App">
            <AppProvider
                i18n={{
                    Polaris: {
                        Common: {
                            checkbox: 'case à cocher',
                        },
                        ResourceList: {
                            sortingLabel: 'Trier par',
                            showing: '{itemsCount} {resource} affichés',
                            defaultItemPlural: 'articles',
                            defaultItemSingular: 'article',
                            Item: {
                                viewItem: "Afficher les détails de l'{itemName}",
                            },
                        },
                    },
                }}>
                <Provider>
                    <RouterProvider router={Router} />
                </Provider>
            </AppProvider>
        </div>
    );
}

export default App;
