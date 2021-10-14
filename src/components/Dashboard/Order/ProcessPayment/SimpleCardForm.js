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
                toast.error('Payment was unsuccessfull!')
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
                <div style={{display:'flex',flexDirection:'column',gap:'5px',marginTop:'15px'}}>
                <h5>
                    CARD: 4242 4242 4242 4242
                </h5>
                <h5>
                    MM/YY: 04/30
                </h5>
                <h5>
                    CVC: 424
                </h5>
                <h5>
                    ZIP: 13444
                </h5>
               </div>
                <button className="brand-btn" type="submit" disabled={!stripe}>
                    Order !
                </button>
            </form>

        </div>
    );
};

export default SimplecardForm;