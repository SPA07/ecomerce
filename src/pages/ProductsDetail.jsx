import React, { useEffect, useState } from "react";
import {CarouselItem,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { addProductToCart } from "../store/slices/sideBar.slice";
import Carousel from "react-bootstrap/Carousel";
import "../styles/products-detail.css";

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsList = useSelector((state) => state.products);
  const productDetail = productsList.find(
    (products) => products.id === Number(id)
  );
  // console.log(productDetail)

  const relatedProducts = productsList.filter(
    (products) => products.category.id === productDetail.category.id
  );

  const [rate, setRate] = useState(1);

  const increment = () => {
    setRate(rate + 1);
  };

  const decrement = () => {
    if (rate === 1) {
      setRate(1);
    } else {
      setRate(rate - 1);
    }
  };

  useEffect(() => {
    setRate(1);
  }, [id]);

  const addToPurchases = () => {
    const adding = {
      id: id,
      quantity: rate,
    };
    dispatch(addProductToCart(adding));
  };

  return (
    <div className="products-details-container">
      <div className="back-home">
        <p className="return-home">Home</p>
        <i className="fa-solid fa-circle"></i>
        <p>{productDetail?.title}</p>
      </div>

      <div className="galery-product-container">
        <div className="carousel-container">
          <Carousel variant="dark">
            {productDetail?.productImgs.map((img) => (
              <CarouselItem key={img}>
                <img className="d-block img" src={img} alt="Image" />
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        <div className="detail-info-container">
          <h1>{productDetail?.title}</h1>
          <p>{productDetail?.description}</p>
          <div className="price-container">
            <div className="price">
              <h4>Price</h4>
              <p>${productDetail?.price}</p>
            </div>
            <div className="quantity-container">
              <h5>Quantity</h5>
              <div className="qty-product-container">
                <button onClick={decrement}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <p>{rate}</p>
                <button onClick={increment}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="add-to-cart">
            <button className="add-to-cart-btn" onClick={addToPurchases}>
              Add to cart{" "}
              <span>
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="related-products-container">
        <h3>Related Products</h3>
        <ul className="realted-products">
          {relatedProducts.map((products) => (
            <li
              key={products.id}
              onClick={() => navigate(`/product/${products.id}`)}
            >
              <div className="related-img-container">
                <img src={products.productImgs[0]} alt="image" />
                <div className="related-ovrl-container">
                  <img className="rp-overlay-img" src={products.productImgs[1]} alt="image" />
                </div>
              </div>
              <div className="related-product-card-container">
                <div className="realted-title">
                  <h4>{products.title}</h4>
                </div>
                <div className="related-price">
                  <h6>
                    <span>Price: </span>
                    <br />${products.price}
                  </h6>
                </div>

                <div className="realted-add-to-cart-container">
                  <div className="realted-add-to-cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsDetail;
