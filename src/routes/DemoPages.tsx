import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

// Components
const ReducerDemo = React.lazy(() => import('../components/reducer-demo/components/Main'));
// const PaymentDemo = React.lazy(() => import('../components/payment-demo/components/Main'));
const Home = React.lazy(() => import('../components/payment-demo/components/Home'));
const ReactPayPal = React.lazy(() => import('../components/payment-demo/components/ReactPayPal'));
const ReactStripe = React.lazy(() => import('../components/payment-demo/components/ReactStripe'));
const ReactRazorpay = React.lazy(() => import('../components/payment-demo/components/ReactRazorpay'));
const StripeSuccess = React.lazy(() => import('../components/payment-demo/components/StripeSuccess'));

const DemoPagesComponent = () => {
  // const renderMultiRoutes = ({ element: Element, paths, ...rest }: any) =>
  // paths.map((path:string) => <Route key={path} path={path} {...rest} element={Element} />);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/reducer`} element={<ReducerDemo />} />
        <Route path="/payment" element={<Home />} />
        <Route path="/payment/paypal" element={<ReactPayPal />} />
        <Route path="/payment/stripe" element={<ReactStripe />} />
        <Route path="/payment/razorpay" element={<ReactRazorpay />} />
        <Route path="/payment/stripe/success/invoice" element={<StripeSuccess />} />
        {/* {renderMultiRoutes({
          paths: ['/payment', '/payment/paypal', '/payment/stripe', '/payment/razorpay', '/payment/stripe/success/invoice'],
          element: <PaymentDemo />,
        })} */}
      </Routes>
    </BrowserRouter>
  );
};

export default DemoPagesComponent;
export const DemoPages = React.memo(DemoPagesComponent);
