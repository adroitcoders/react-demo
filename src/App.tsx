import React, { Suspense } from 'react';
import { UserDataProvider } from './UserDataContext';

const LoginComponent = React.lazy(() => import('./components/LoginComponent'));
const Topnav = React.lazy(() => import('./components/Topnav'));
const DemoPages = React.lazy(() => import('./routes/DemoPages'));

function App() {
  const sessValue = sessionStorage.getItem('react-demo-session-user');
  const sessionUser = typeof sessValue === 'string' ? JSON.parse(sessValue) : undefined;

  return (
    <div>
      {!sessionUser ?
        <Suspense fallback={<div>Loading...</div>}>
          <LoginComponent />
        </Suspense>
      : 
        <UserDataProvider UserDataProps={sessionUser}>
          <React.Fragment>
            <Suspense fallback={<div>Loading...</div>}>
              <Topnav />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <DemoPages />
            </Suspense>
           </React.Fragment>
        </UserDataProvider>
      }
    </div>
  );
}

export default App;
