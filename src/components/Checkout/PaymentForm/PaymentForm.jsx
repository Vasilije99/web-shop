import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import './paymentForm.css'

import Review from './Review/Review'

const stripePromise = loadStripe('pk_test_51K1AwBDCC8Upr6zGBGJgTROKSrHAsTlOWfiW0C1JOwgfippNLjk9ySMl6rBr394h0YZaNtpm5KBB5phA6yEfToCS00ILny4O0w');

const PaymentForm = ({ checkoutToken, shippingData, onCaptureCheckout, confirmStep, backStep, timeout }) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'International',
                    street: shippingData.address,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.id, orderData);

            timeout();

            confirmStep();
        }
    }

    return (
        <div className='payment-form'>
            <Review checkoutToken={checkoutToken} />

            <div className="credit-card">
                <h3>Payment Method</h3>
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                <CardElement />
                                <br /> <br />
                                <div className="buttons">
                                    <button onClick={backStep}>Back</button>
                                    <button type='submit' disabled={!stripe}>
                                        Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                    </button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </div>
        </div>
    )
}

export default PaymentForm
