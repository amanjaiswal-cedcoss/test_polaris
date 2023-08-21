import React from 'react';
import './App.css';
import '@shopify/polaris/build/esm/styles.css';
import Home from './components/Home';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppProvider i18n={{
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
      <Home/>
      </AppProvider>
      </BrowserRouter></div>
  );
}

export default App;
