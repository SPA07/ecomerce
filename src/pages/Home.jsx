import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  InputGroup,
  Card,
  Col,
  ListGroup,
  Row,
  ListGroupItem,
} from "react-bootstrap";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const productsList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productFiltered, setProductFiltered] = useState([]);
  const [productName, setProductName] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  //   console.log(categories);

  useEffect(() => {
    setProductFiltered(productsList);
  }, [productsList]);

  const filterCategory = (categoryId) => {
    const filtered = productsList.filter(
      (products) => products.category.id === categoryId
    );
    setProductFiltered(filtered);
  };

  //   console.log(productFiltered)

  const searchProduct = () => {
    const filtered = productsList.filter((products) =>
      products.title?.toLowerCase().includes(productName?.toLowerCase())
    );
    setProductFiltered(filtered);
  };

  return (
    <Row>
      <Col id="column-categories" lg={3}>
        <p >
          Categories{" "}
          {/* <i
            // onClick={() => setShow(!show)}
            className="fa-solid fa-caret-down"
          ></i> */}
          
        </p>
        <ListGroup>
          {
            categories.map((category) => (
              <ListGroupItem 
                // className={`${show && 'category-list-openAnimation'}`}
                key={category.id}
                onClick={() => filterCategory(category.id)}
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3 mt-3">
          <Form.Control
            placeholder="Search Product"
            onChange={(e) => setProductName(e.target.value)}
            aria-describedby="basic-addon2"
            value={productName}
          />

          <Button
            className="btn btn-dark"
            variant="outline-secondary"
            onClick={searchProduct}
          >
            Search
          </Button>
        </InputGroup>

        <Row xs={1} md={2} xl={3} className="g-4" id="cards">
          {productFiltered.map((product) => (
            <Col key={product.id}>
              <Card
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ height: "100%" }}
              >
                 <div className="img-container">
                <img src={product.productImgs[1]} alt="" />
                <div className="overlay-container">
                  <img
                    className="overlay-img"
                    src={product.productImgs[0]}
                    alt=""
                  />
                </div>
              </div>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <div className="product-price">
                  <Card.Text>
                    <span>Price:  ${product.price} </span>
                  </Card.Text>
                  <Card.Text>
                    <span>{product.status}</span>
                  </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
