import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { withRouter } from "react-router";
import UploadProdCover from "./UploadProdCover";
import dateFormat from "dateformat";
import Reviews from "./Reviews";

// import uniqid from "uniqid";

const Product = ({ match }) => {
  const { id } = match.params;
  const [product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(true);

  // FETCH PRODUCT
  const fetchProduct = async (prdId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${prdId}`
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // New Review
  // const postNewReview = async (e) => {
  //   e.preventDefault(e);
  //   try {
  //     let response = await fetch(
  //       `${process.env.REACT_APP_URLFETCHING}/reviews`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify(newReview),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       alert("Success!");
  //       // fetchReviews(id);
  //     } else {
  //       alert("Error !");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    fetchProduct(id);
    // fetchReviews(id);
  }, []);

  return (
    <div className="product-details-root">
      <Container className={Loading && "text-center"}>
        <Row>
          <Col xs="12" md={9} className="p-1">
            {!Loading && product ? (
              <>
                <img
                  className="product-details-cover w-100"
                  src={product.imageUrl}
                  style={{ maxHeight: "20rem", objectFit: "contain" }}
                  alt="heeey"
                />
                <div className="p-2">
                  <h1 className="product-details-title">{product.name}</h1>
                  <h4 className="product-details-title font-italic">
                    {product.brand}
                  </h4>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted">
                      Category:{" "}
                      <span
                        className="text-dark font-weight-bold"
                        style={{ cursor: "pointer" }}
                      >
                        {product.category[0].name}
                      </span>
                    </p>
                    <small className="text-muted">
                      Published:{" "}
                      <span className="text-dark font-weight-bold">
                        {dateFormat(product.createdAt, "mmmm d, yyyy	")}
                      </span>
                    </small>
                  </div>
                  <div className="product-details-container">
                    <div className="product-details-author">
                      <p>{product.description}</p>
                      <p className="text-muted ml-5">
                        Price:{" "}
                        <span className="font-weight-bold text-dark">
                          £{product.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  {/* UPLOAD COVER BUTTON */}
                  <UploadProdCover
                    id={id}
                    fetchProduct={() => fetchProduct(id)}
                  />
                </div>
              </>
            ) : (
              <Spinner
                className="mt-5 text-center"
                animation="border"
                role="status"
              />
            )}
          </Col>
          {/* REVIEWS */}
          <Col xs={12} md={3}>
            <Reviews prodtId={id} />
          </Col>
        </Row>

        {/* IMG UPLOAD */}
      </Container>
    </div>
  );
};

export default withRouter(Product);
