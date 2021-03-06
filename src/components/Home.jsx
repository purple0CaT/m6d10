import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "./Cart";
// import BlogList from "../../components/blog/blog-list";

const Home = () => {
  const [LoadPageBtn, setLoadPageBtn] = useState(true);
  const [productsArray, setProductsArray] = useState();
  const [Page, setPage] = useState(1);
  const [Categ, setCateg] = useState([]);
  const [Search, setSearch] = useState(false);
  const [CatLoad, setCatLoad] = useState(true);
  const [CartAdd, setCartAdd] = useState({ userId: 1 });
  const [LastAdd, setLastAdd] = useState([]);

  //=FETCH ALL PRODUCTS
  const fetchProducts = async (links, category) => {
    let url = `${process.env.REACT_APP_URLFETCHING}/products?&offset=0&limit=6${
      (typeof category !== "undefined") & (category !== "")
        ? `&category=${category}`
        : ""
    }`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let products = await response.json();
        setProductsArray(products);
        setLoadPageBtn(false);
        // setPages(products[1]);
        // setSearch(searchVal ? false : true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //=FETCH page PRODUCTS
  const fetchPage = async (links) => {
    // setCatLoad(false);
    // setCatLoad(true);
    let url = `${process.env.REACT_APP_URLFETCHING}${links}`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let products = await response.json();
        setProductsArray(products);
        setLoadPageBtn(false);
        // setPages(products[1]);
        // setSearch(searchVal ? false : true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //= FETCH CATEGORY
  const fetchCateg = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/category`
      );
      if (response.ok) {
        let data = await response.json();
        setCateg(data);
        setCatLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // === ADD TO CART
  // const addToCart12 = (prodId) => {
  //   console.log(prodId);
  // };
  const addToCart = async (prodId) => {
    await setCartAdd({ ...CartAdd, productId: prodId });
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/cart/${prodId}`,
        {
          method: "POST",
          body: JSON.stringify(CartAdd),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        alert("Added!");
        setLastAdd(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(Page);
    fetchCateg();
  }, []);

  return (
    <Container fluid="sm">
      {/* CART */}
      {/* === */}
      <Row>
        <Col xs="12" md="9">
          <h1 className="blog-main-title">Welcomennnne</h1>
        </Col>
        <Col xs="12" md="3">
          <Cart lastCard={LastAdd} />
        </Col>
        <Col xs="12" md="3">
          <Form.Control
            className="mt-3"
            as="select"
            onChange={(e) => fetchProducts(1, e.target.value)}
          >
            <option value="">none</option>
            {/* <option value="smartphone">Smartphone</option>
            <option value="TV">TV</option>
            <option value="laptop">Laptop</option>
            <option value="headphone">Headphones</option> */}
            {/* === CATEGORYS ==== */}
            {!CatLoad &&
              Categ.map((c) => (
                <option key={c._id * 0.4} value={c._id}>
                  {c.name}
                </option>
              ))}
          </Form.Control>
        </Col>
      </Row>
      <Row className={LoadPageBtn && "justify-content-center"}>
        {LoadPageBtn ? (
          <Spinner className="mt-5" animation="border" role="status" />
        ) : (
          productsArray.products.map((product) => (
            <Col xs={12} md={4} className="my-3">
              <div className="myCard h-100 w-100 card">
                <Link to={`/product/${product._id}`} className="anchorUnset">
                  <Card.Img variant="top" src={product.imageUrl} />
                  <Card.Body className="px-3 pb-2 text-dark d-flex flex-column">
                    <Card.Title>
                      {product.brand} {product.name}
                    </Card.Title>
                    <p className="m-0 font-weight-bold text-black-50">
                      Price :??{product.price}
                    </p>
                  </Card.Body>
                </Link>
                <div
                  className="mt-auto text-center"
                  style={{ borderTop: "1px solid rgb(128,128,128, 0.5)" }}
                >
                  <button
                    onClick={(e) => addToCart(product._id)}
                    className="btn btn-info my-1"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
      <Row className="justify-content-center my-3 gap">
        {!LoadPageBtn && productsArray.links.prev && (
          <Col className="page text-center" xs={1} key={13 + "h123ffas"}>
            <button
              value=""
              onClick={(e) => fetchPage(productsArray.links.prev)}
            >
              Prev
            </button>
          </Col>
        )}

        {/* {!LoadPageBtn && productsArray.links.prev && (
          <Col className="page text-center" xs={1} key={13 + "h123ffas"}>
            <button
              value=""
              onClick={(e) => fetchPage(productsArray.links.prev)}
            >
              Prev
            </button>
          </Col>
        )} */}
        {!LoadPageBtn && productsArray.links.next && (
          <Col className="page text-center" xs={1} key={13 + "h123ffas"}>
            <button
              value=""
              onClick={(e) => fetchPage(productsArray.links.next)}
            >
              Next
            </button>
          </Col>
        )}
        {/* {!LoadPageBtn && productsArray.links.last && (
          <Col className="page text-center" xs={1} key={13 + "h123ffas"}>
            <button
              value=""
              onClick={(e) => fetchPage(productsArray.links.last)}
            >
              Last
            </button>
          </Col>
        )} */}
      </Row>
    </Container>
  );
};

export default Home;
