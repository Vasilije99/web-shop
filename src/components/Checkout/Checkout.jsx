import React, { useEffect, useState } from 'react'
import { commerce } from '../../lib/commerce';
import { useNavigate } from 'react-router';
import './checkout.css'

import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import { Link } from 'react-router-dom';

const steps = ['AddressForm', 'PaymentForm'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);
            } catch (error) {
                navigate('/');
            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStepOne(false);
        setStepTwo(true);
    }

    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setStepOne(true);
        setStepTwo(false);
    }

    const confirmStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStepOne(true);
        setStepTwo(true);
    }

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    const Form = () => (activeStep === 0
        ? <AddressForm
            checkoutToken={checkoutToken}
            next={next}
        />
        : <PaymentForm
            checkoutToken={checkoutToken}
            shippingData={shippingData}
            onCaptureCheckout={onCaptureCheckout}
            confirmStep={confirmStep}
            backStep={backStep}
            timeout={timeout}
        />
    )

    const Confirmation = () => order.customer ? (
        <div>
            <h3>Thank you for your purchase, {order.customer.name} {order.customer.lastname}</h3>
            <p>Order ref: {order.customer_reference}</p>
            <Link to='/'>Back to Home!</Link>
        </div>
    ) : isFinished ? (
        <div>
            <h3>Thank you for your purchase</h3>
            <Link to='/'>Back to Home!</Link>
        </div>
    ) : (
        <div>Loading . . .</div>
    )

    if (error) {
        return (
            <div>
                <h2>Error: {error}</h2>
                <br />
                <Link to='/'>Back to Home!</Link>
            </div>
        )
    }

    return (
        <div className='checkout-steps'>
            <h2 className="checkout-header">Checkout</h2>
            <div className="steps">
                <div className="step-div">
                    <span className={`step ${stepOne ? 'active' : ''}`}>1</span>
                    Shipping Address
                </div>
                <div className="line"></div>
                <div className="step-div">
                    <span className={`step ${stepTwo ? 'active' : ''}`}>2</span>
                    Payment Details
                </div>
            </div>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </div>
    )
}

export default Checkout
