import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SimplecardForm = ({ handlePaymentSuccess }) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {

            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess(null);
        } else {
            setPaymentSuccess(paymentMethod.id);
            setPaymentError(null);
            handlePaymentSuccess(paymentMethod.id);
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
                <CardElement />
                {paymentError &&
                    toast.error('Payment was unsuccessfull!')
                }
                <button className="brand-btn" type="submit" disabled={!stripe}>
                    Order !
                </button>
            </form>

        </div>
    );
};

export default SimplecardForm;