import React from "react";
import { Offcanvas, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { getSideBarThunk } from "../store/slices/sideBar.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { purchaseThunk, deleteCartProductThunk } from "../store/slices/sideBar.slice";
import { Link } from "react-router-dom";
import '../styles/cart.css';

const SideBar = ({ show, handleClose }) => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkOut = () => {
    dispatch(purchaseThunk());
    navigate("/purchases");
  };

  useEffect(() => {
    dispatch(getSideBarThunk());
  }, []);

  const total = () => {
    let finalPrice = 0;
    sidebar?.forEach((product) => {
      finalPrice += Number(product.price) * product.productsInCart?.quantity;
    });
    return finalPrice;
  };

  const deleteProduct = (id) => {
    dispatch(deleteCartProductThunk(id));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          {sidebar.map((product) => (
            <ListGroupItem  key={product.id}>
              <Link to={`/product/${product.id}`}>
                <i
                  onClick={() => deleteProduct(product.id)}
                  className="fa-solid fa-trash-can"
                ></i>
                <div className="product-cart-container">
                  <p className="product-cart-brand">{product.brand}</p>
                  <p className="product-cart-title">{product.title}</p>
                </div>
                <div className="product-cart-info-container">
                  <p className="product-cart-qty">
                    {product.productsInCart.quantity}
                  </p>
                  <p className="product-cart-total">
                    <span>Total: </span>
                    <b>$ {product.price * product.productsInCart.quantity}</b>
                  </p>
                </div>
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Offcanvas.Body>
      <div className="cart-checkout">
        <h3>Total: ${total()}.00</h3>
        <Button className="cart-checkout-btn" onClick={checkOut}>Checkout</Button>
      </div>
    </Offcanvas>
  );
};

export default SideBar;
