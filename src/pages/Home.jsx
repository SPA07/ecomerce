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
  CardImg
} from "react-bootstrap";

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
      <Col lg={3}>
        <button onClick={() => setShow(!show)} >show / hide</button>
        <ListGroup>
          {show && categories.map((category) => (
            <ListGroupItem key={category.id} onClick={() => filterCategory(category.id)} style={{cursor: "pointer"}}>
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
            value={productName}
          />
          
          <Button variant="outline-secondary" onClick={searchProduct}>
            Button
          </Button>
        </InputGroup>

        <Row xs={1} md={2} xl={3} className="g-4" id="cards">
          {productFiltered.map((product) => (
            <Col key={product.id}>
              <Card 
              onClick={() => navigate(`/product/${product.id}`)}
              style={{height: "100%"}}
              >
                <CardImg id="card-img" variant="top" src={product.productImgs?.[1]} alt="image" />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
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
