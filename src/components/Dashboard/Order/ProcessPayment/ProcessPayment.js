import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimplecardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51IeLQZAvsvQNHtU3KS6ReUzeWdOEsgfy5XcOdoXrB75pPpI0WwCdbCsRpF8sRgtlY43v9Vh0fkuyXx48Rymhr7rn00h8eg8dDp');


const ProcessPayment = ({handlePaymentSuccess}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimplecardForm handlePaymentSuccess={handlePaymentSuccess} />
        {/* <SplitForm/> */}
        </Elements>

    );
};

export default ProcessPayment;


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

