import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGlobalContext } from "../context";

const url = "https://products-api-express.herokuapp.com/api/v1/products";

// name, type, image, h, w, price, rating, description
function AddProductFormik() {
  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });
  const { getProducts } = useGlobalContext();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [height, setHeight] = useState(0.0);
  const [width, setWidth] = useState(0.0);
  const [price, setPrice] = useState(0.0);
  const [rating, setRating] = useState(0.0);
  const [description, setDescription] = useState("");

  /**
   * @desc      Function to create a product
   * @request   POST
   * @params    none
   * @return    none
   */
  const createProduct = async () => {
    await axios.post(`${url}`, {
      title: title,
      type: type,
      image: image,
      height: height,
      width: width,
      price: price,
      rating: rating,
      description: description,
    });

    navigateToProducts();
    getProducts();
  };

  const AddProductScheme = Yup.object().shape({
    title: Yup.string()
      .min(4, "Title is too short!")
      .max(50, "Title is too long!")
      .required("Title is Required"),
    type: Yup.string()
      .min(3, "Type is too short!")
      .max(50, "Type is too long!")
      .required("Type is Required"),
    image: Yup.string().matches(
      /(https?:\/\/.*\.(?:png|jpg))/i,
      "Invalid image URL!"
    ),
    height: Yup.number()
      .min(1, "Height is too short!")
      .max(100, "Height more than 100cm not permitted!")
      .required("Height is Required"),
    width: Yup.number()
      .min(1, "Width is too less!")
      .max(100, "Width more than 100cm not permitted!")
      .required("Width is Required"),
    price: Yup.number()
      .min(1, "Price cannot be zero/negative!")
      .required("Price is required"),
    rating: Yup.number()
      .min(1, "Rating cannot be zero/negative!")
      .required("Rating is required"),
    description: Yup.string()
      .min(10, "Description is too short!")
      .max(100, "Description is too long!")
      .required("Description is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          type: "",
          image: "",
          height: "",
          width: "",
          price: "",
          rating: "",
          description: "",
        }}
        validationSchema={AddProductScheme}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form
            className="border border-primary"
            style={{
              margin: "2rem",
              border: "1px solid lightgray",
              padding: "2rem",
              borderRadius: "1rem",
            }}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Name
              </label>
              <Field className="form-control" onKeyUp={(e) => setTitle(e.target.value)} name="title" />
              {touched.title && errors.title && <div style={{color: "red"}}>{errors.title}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <Field className="form-control" onKeyUp={(e) => setType(e.target.value) } name="type" />
              {touched.type && errors.type && <div style={{color: "red"}}>{errors.type}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <Field className="form-control" onKeyUp={(e) => setImage(e.target.value)} name="image" />
              <small className="text-muted">Enter a proper URL, else leave the field blank.</small>
              {touched.image && errors.image && <div style={{color: "red"}}>{errors.image}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="height" className="form-label">
                Height
              </label>
              <Field className="form-control" onKeyUp={(e) => setHeight(e.target.value)} name="height" />
              {touched.height && errors.height && <div style={{color: "red"}}>{errors.height}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="width" className="form-label">
                Width
              </label>
              <Field className="form-control" onKeyUp={(e) => setWidth(e.target.value)} name="width" />
              {touched.width && errors.width && <div style={{color: "red"}}>{errors.width}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <Field className="form-control" onKeyUp={(e) => setPrice(e.target.value)} name="price" />
              {touched.price && errors.price && <div style={{color: "red"}}>{errors.price}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <Field className="form-control" onKeyUp={(e) => setRating(e.target.value)} name="rating" />
              {touched.rating && errors.rating && <div style={{color: "red"}}>{errors.rating}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field className="form-control" onKeyUp={(e) => setDescription(e.target.value)} name="description" />
              {touched.description && errors.description && (
                <div style={{color: "red"}}>{errors.description}</div>
              )}
            </div>

            <div className="d-flex justify-content-center d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                style={{ width: "80%" }}
                onClick={createProduct}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddProductFormik;
