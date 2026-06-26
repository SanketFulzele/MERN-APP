import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import "./ProductsTable.css"
import { BadgePlus, Pencil, Trash2 } from 'lucide-react';
import { useProductStore } from "../../../store/productStore";
import api from '../../../api/axios';
import { showSuccess } from '../../ToastProvider/toastService';

const ProductsTable = () => {

   const { products, setSelectedProduct, refreshProducts, addProductToCart, addedProductIds } = useProductStore();

    useEffect(() => {
        refreshProducts();
    }, [refreshProducts])

    const handleDeleteProducts = async(id:string) => {
        try{
            const result = await api.delete(`/api/delete-products/${id}`)
            refreshProducts();
            showSuccess(result.data.message)
        }catch(error) {
            console.log(error)
        }
    }

    const handleAddItemCart = (product:any) => {
        addProductToCart(product)
    }

    return (
        <div className='products-table-container'> 
        <Table striped bordered hover className="product-table">
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {
                    products &&
                    products.length > 0 &&
                    products.map((values, index) => {
                        return <tr key={values?._id}>
                            <td>{index + 1}</td>
                            <td>{values?.productName}</td>
                            <td>{values?.description}</td>
                            <td>{values?.category}</td>
                            <td>{values?.price}</td>
                            <td>
                                <div className="action-icons">
                                    <Pencil
                                        size={16}
                                        className="edit-icon"
                                        onClick={() => setSelectedProduct(values)}
                                    />

                                    <Trash2
                                        size={16}
                                        className="delete-icon"
                                        onClick={() => handleDeleteProducts(values?._id)}
                                    />

                                    {!addedProductIds.includes(values?._id) ? (
                                      <BadgePlus
                                          size={16}
                                          className="add-icon"
                                          onClick={() => handleAddItemCart(values)}
                                      />
                                    ) : (
                                      ""
                                    )}
                                </div>
                            </td>
                        </tr>
                    })}

            </tbody>
        </Table>
        </div>
    )
}

export default ProductsTable