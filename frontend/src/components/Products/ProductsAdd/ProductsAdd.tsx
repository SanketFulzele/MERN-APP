import { useFormik } from "formik";
import * as Yup from "yup";
import "./ProductsAdd.css";
import api from "../../../api/axios";
import { showSuccess } from "../../ToastProvider/toastService";
import { useProductStore } from "../../../store/productStore";

const ProductsAdd = () => {

  const { selectedProduct, clearSelectedProduct, refreshProducts } = useProductStore();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      productName: selectedProduct?.productName || "",
      description: selectedProduct?.description || "",
      category: selectedProduct?.category || "",
      price: selectedProduct?.price || "",
    },

    validationSchema: Yup.object({
      productName: Yup.string()
        .required("Product Name is required"),

      description: Yup.string()
        .required("Description is required"),

      category: Yup.string()
        .required("Category is required"),

      price: Yup.number()
        .positive("Price must be greater than 0")
        .required("Price is required"),
    }),

    onSubmit: async (values) => {
      try {
        let result;

        if (selectedProduct?._id) {
          result = await api.put(
            `/api/edit-products/${selectedProduct._id}`,
            values
          );
        } else {
          result = await api.post(
            "/api/add-products",
            values
          );
        }

        showSuccess(result.data.message);
        await refreshProducts();
        clearSelectedProduct();
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="product-form">
      <div className="form-row">

        <div className="form-group">
          <input
            type="text"
            name="productName"
            placeholder="Enter Product Name"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.productName && formik.errors.productName && (
            <p className="error">{formik.errors.productName}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="description"
            placeholder="Enter Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="error">{formik.errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="category"
            placeholder="Enter Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="error">{formik.errors.category}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="error">{formik.errors.price}</p>
          )}
        </div>

      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default ProductsAdd;