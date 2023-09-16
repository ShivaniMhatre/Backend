// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { UserContext } from '../../Context/UserContext';
// import toast from 'react-hot-toast';

// const SingleProduct = () => {
//     const [SingleProduct, setSingleProduct] = useState({})
//     const { singleProId } = useParams();
//     const { state } = useContext(UserContext);

//     useEffect(() => {
//         async function getSinglePro() {
//             try {
//                 const response = await AudioParam.post('/singlePro', { singleProId })
//                 if (response.data.success) {
//                     setSingleProduct(response.data.SingleProductData)
//                 } else {
//                     toast.error(response.data.message)
//                 }
//             } catch (error) {
//                 console.log("On the Way")
//             }
//         }
//         getSinglePro();
//     }, [singleProId])
//     return (
//         <div>
//             {SingleProduct?.name ? (
//                 <div style={{display: 'flex',justifyContent: 'space-evenly',marginTop: '2%'}}>
//                     <div style={{ width: '40%' }}>
//                         <img style={{ width: '100%', height: '500px' }} src={SingleProduct.image} alt="" />
//                     </div>
//                     <div style={{ width: '40%' }}>
//                         <h1>{SingleProduct.name}</h1>
//                         <h2>Rs.{SingleProduct.price}</h2>
//                     </div>

//                 </div>
//             ) :(}

//         </div>
//     )
// }

// export default SingleProduct