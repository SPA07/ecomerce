import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  return (
    <Container id="purchases">
        <header>
            <p onClick={() => navigate('/')} style={{cursor: 'pointer'}} >Home</p>
            <p className="point"></p>
            <p>purchases</p>
        </header>
      {purchases.map((purchase) => {
        const date = new Date(purchase.createdAt);
        return (
          <ListGroup
            className="mb-3"
            id="purchases-container"
            key={purchase.id}
          >
            <ListGroupItem >
                <ListGroupItem className="date">
                    {date.toLocaleDateString(undefined, options)}
                </ListGroupItem>
              {purchase.cart.products.map((item) => (
                <ListGroupItem
                  className="products"
                  key={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  {item.title}
                  <ListGroupItem id="price">${item.price}</ListGroupItem>
                </ListGroupItem>
              ))}
            </ListGroupItem>
          </ListGroup>
        );
      })}
    </Container>
  );
};

export default Purchases;
