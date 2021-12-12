import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import './addressForm.css'
const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const { register, handleSubmit } = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchShippingSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision])

    return (
        <div className='addressForm'>
            <h3>Shipping Address</h3>
            <FormProvider>
                <form className='form' onSubmit={handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <div className='inputs'>
                        <label>First Name: <input {...register('firstName')} /></label>
                        <label>Last Name: <input {...register('lastName')} /></label>
                        <label>Address: <input {...register('address')} /></label>
                        <label>Email: <input {...register('email')} /></label>
                        <label>City: <input {...register('city')} /></label>
                        <label>ZIP: <input {...register('zip')} /></label>
                    </div>

                    <div className="shipping">
                        <h4>Shipping Country</h4>
                        <select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((item) => (
                                <option value={item.id} key={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="shipping">
                        <h4>Shipping Subdivision</h4>
                        <select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {subdivisions.map((item) => (
                                <option value={item.id} key={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="shipping">
                        <h4>Shipping Option</h4>
                        <select value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((item) => (
                                <option value={item.id} key={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="buttons" style={{ marginTop: '15px' }}>
                        <Link to='/cart'>
                            <button>Back to Cart</button>
                        </Link>
                        <button type='submit'>Next</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
