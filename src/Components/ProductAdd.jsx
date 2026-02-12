import React from 'react'

function ProductAdd() {
  return (<>
   <form>
    <label>Product Name:</label><br/>
  <input   type="text" name="name" required pattern="^[A-Za-z0-9 ]{3,100}$"title="Only letters, numbers and spaces (3-100 characters)"/>
  <br/>
  <label>Price:</label><br/>
  <input type="number" name="price" min="0" step="0.01" />
  <br/><br/><br/>
  <label>Offer Percentage:</label><br/>
  <input type="number" name="offer"  min="0" max="100" />
  <br/><br/><br/>

   <button type="submit">Submit</button>
   </form>
  </>
  )
}

export default ProductAdd