import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProductsDetail = () => {
  const { id } = useParams();

  const productsList = useSelector((state) => state.products);
  const productDetail = productsList.find(
    (products) => products.id === Number(id)
  );
  // console.log(productDetail)

  const relatedProducts = productsList.filter(
    (products) => products.category.id === productDetail.category.id
  );

  return (
    <Row>
      <Col>
        <h1>{productDetail?.title}</h1>
        <img src={productDetail?.productImgs?.[2]} alt="image" className="img-fluid" />
        <h5>${productDetail?.price}</h5>
      </Col>

      <Row>
        <Col lg={3}>
          <ListGroup className="mt-5">
            {relatedProducts.map((products) => (
              <ListGroupItem key={products.id}>
                <Link to={`/product/${products.id}`}>
                  <img
                    src={products.productImgs?.[1]}
                    alt=""
                    className="img-fluid"
                  />
                  {products.title}
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Row>
  );
};

export default ProductsDetail;
