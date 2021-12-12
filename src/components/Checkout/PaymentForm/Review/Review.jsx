import React from 'react'
import './review.css'

const Review = ({ checkoutToken }) => {
    return (
        <div className='review'>
            <h3>Order Summary</h3>
            <ul className="orderedList">
                {checkoutToken.live.line_items.map((item) => (
                    <li className="orderedListItem" key={item.name}>
                        <h4>{item.name}, {`Quantity: ${item.quantity}`}</h4>
                        {item.line_total.formatted_with_symbol}
                    </li>
                ))}
                <li className="orderedListItem">
                    <h4>Total: </h4>
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                </li>
            </ul>
        </div>
    )
}

export default Review
