import BreadCrum from '../components/BreadCrum'
import Card_3 from '../components/cards/Card_3'
import { Link } from 'react-router-dom'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { BsArrowLeft } from 'react-icons/bs'

const Cart = () => {
  return (
    <>
      <BreadCrum title="Your Cart" />
      <div className="cart commonSection">
        <div className="container">
          <div className="items">
            <div className="cardTitle flex justifyContentBetween">
              <div className="heading">
                <h4>Product</h4>
              </div>
              <div className="heading">
                <h4>Price</h4>
              </div>
              <div className="heading">
                <h4>Quantity</h4>
              </div>
              <div className="heading">
                <h4>Total</h4>
              </div>
              <div className="heading">
                <h4>View</h4>
              </div>
            </div>
            <div className="cartItems">
              <Card_3 />
              <Card_3 />
            </div>
          </div>

          <div className="controlls flex justifyContentBetween alignCenter">
            <div className="back">
              <Link to={"/"} className='globalBtn_3'><span><BsArrowLeft /></span> Go Back</Link>
            </div>
            <div className="back">
              <button className='globalBtn'><span><IoCloseCircleOutline /></span> Clear Cart</button>
            </div>
          </div>

          <div className="subtotals flex justifyContentEnd alignCenter">
            <div className="mainTotal">
              <h4>Cart Total</h4>
              <div className="area flex justifyContentBetween">
                <h5>Subtotal</h5>
                <h5><b>₹200</b></h5>
              </div>
              <div className="area flex justifyContentBetween">
                <h5>Discount</h5>
                <h5><b>₹200</b></h5>
              </div>
              <div className="area flex justifyContentBetween">
                <h5>Total</h5>
                <h5><b>₹200</b></h5>
              </div>

              <button className='globalBtn'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
