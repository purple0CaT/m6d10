import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import dateFormat from "dateformat";

export default function Reviews({ prodtId }) {
  const [Loading, setLoading] = useState(true);
  const [Review, setReview] = useState([]);
  const [newReview, setNewReview] = useState({
    comment: "",
    rate: "",
    productId: prodtId,
  });

  // FETCH review
  const fetchReview = async (prodtId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/reviews/`
      );
      if (response.ok) {
        const data = await response.json();
        setReview(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // NEW REVIEW
  const postNewReview = async (e) => {
    e.preventDefault(e);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/reviews`,
        {
          method: "POST",
          body: JSON.stringify(newReview),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Success!");
        // fetchReviews(id);
      } else {
        alert("Error !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ==
  useEffect(() => {
    fetchReview(prodtId);
  }, []);
  return (
    <>
      <div className="mt-5">
        <h4 className="text-center">Reviews</h4>
        <hr />
        <div className="reviewCont">
          {!Loading ? (
            Review.map((review) => (
              <div
                key={review._id}
                className="my-1 d-flex flex-column p-2"
                style={{
                  border: "1px solid #C0C0C0",
                  borderRadius: "10px",
                }}
              >
                <h5>{review.comment}</h5>
                <small>
                  Rate:{" "}
                  {Array.from({ length: review.rate }).map((x) =>
                    review.rate >= 3 ? "⭐️" : "🍅"
                  )}
                </small>
                <small className="text-muted font-weight-bold">
                  {dateFormat(review.createdAt, "mmm d, yyyy")}
                </small>
                {/* <small className="text-muted">User: {review.user.name}</small> */}
              </div>
            ))
          ) : (
            <Spinner
              className="mt-5 text-center"
              animation="border"
              role="status"
            />
          )}
        </div>

        <hr />
        {/*ADD REVIEW*/}
        <Form
          className="p-2"
          onSubmit={postNewReview}
          style={{ border: "1px solid #C0C0C0", borderRadius: "10px" }}
        >
          <h5 className="text-center">Leave a review</h5>
          <Form.Group>
            <Form.Control
              defaultValue="1"
              size="auto"
              as="select"
              onChange={(e) =>
                setNewReview({ ...newReview, rate: e.target.value })
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Control>
            <Form.Control
              size="auto"
              placeholder="Comment"
              className="mt-1"
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
            <Form.Group className="d-flex justify-content-center mt-3">
              <Button type="submit" size="lg" variant="dark">
                Submit Review
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
