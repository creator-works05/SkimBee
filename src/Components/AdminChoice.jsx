import React, { useContext } from 'react'
import { AdminContext } from '../Pages/Admin'

function AdminChoice() {
    const {choice}=useContext(AdminContext)
    switch(choice){
        case "addProduct": return <h1>Add Product Form </h1>
        case "addMainType":return <h1>Add Main Type Form</h1>
        case "addSubType1":return <h1>Add Sub Type 1 Form</h1>
    }
    
  return (
    <>
    <h1>Imported {choice}</h1>

    </>
  )
}

export default AdminChoice