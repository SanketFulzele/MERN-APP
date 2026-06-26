import React from 'react'
import Navbar from '../../components/Products/Navbar/Navbar'
import ProductsAdd from '../../components/Products/ProductsAdd/ProductsAdd'
import ProductsTable from '../../components/Products/ProductsTable/ProductsTable'
import LinkedCard from '../../components/Products/LinkedCard/LinkedCard'

const List = () => {
  return (
    <>
    <Navbar />
    <ProductsAdd />
    <ProductsTable />
    <LinkedCard/>

    </>
  )
}

export default List