import { FormRegistration, Header, Home, Users } from '../../Components/index';

import './App.scss';

export const App = () => {
  
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Home/>
        <Users/>
        <FormRegistration/>
      </main>
    </div>
  );
};
