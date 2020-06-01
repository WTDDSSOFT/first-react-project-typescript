import React from 'react';
import Routes from './routes';
/**TYPES OF ROUTES */
import { BrowserRouter } from 'react-router-dom';

import GloblaStyle from './styles/global';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GloblaStyle />
  </>
);

export default App;
