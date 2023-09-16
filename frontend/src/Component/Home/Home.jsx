import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import '../Home/Home.css'
import api from '../Appconfig'

const Home = () => {

  const { state } = useContext(UserContext);
  const route = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state
  const productsPerPage = 4;
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filter products based on the search term
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  useEffect(() => {
    async function getProducts() {
      // const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.post("/all_products")
      // console.log(response.data, "home16")
      if (response.data.success) {
        setAllProducts(response.data.product)
        // console.log(response.data, "home19")
      }
    }
    getProducts();
  }, [])

  return (
    
    <div>
    <div>Welcome: {state?.user?.name}</div>
    <div id='main'>
      {/* <h2>All products</h2> */}

      <div id='search-section'>
        {/* Add a search input */}
        <input id='search'
          type="text"
          placeholder="Search products"
        
          onChange={handleSearchChange}
        />
      </div>

      {currentProducts.length ? (
        <div>
          {currentProducts.map((product) => (
            <div onClick={() => route(`/single-products/${product._id}`)} key={product._id}>
              <div id='img-div'>
                <img src={product.image} alt={product.name} />
              </div>
              <p>{product.name}</p>
              <p>{product.price} ₹</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No Products found!</div>
      )}

      <div className="pagination">
        <button onClick={prevPage} style={{width:'10%',height:'30px'}}>Previous </button>
        <button onClick={nextPage} style={{width:'10%',height:'30px'}}>Next</button>
      </div>
    </div>
  </div>
);
};

  

export default Home