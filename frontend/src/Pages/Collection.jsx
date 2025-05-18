import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import CollectionsComponent from '../components/CollectionsComponent';
import CrossIcon from "../assets/frontend_assets/cross_icon.png";
import { Search } from '@mui/icons-material';
import { useGetProductsQuery } from '../services/createApi';
import { Oval } from 'react-loader-spinner';

function Collection({ showForm, setShowForm }) {
  const { isFetching, data = [] } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (data.length) {
      setProductData(data);
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    let productCopy = [...productData];

    if (search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortType === 'low-high') {
      productCopy = productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      productCopy = productCopy.sort((a, b) => b.price - a.price);
    }

    setProducts(productCopy);
  }, [productData, category, subCategory, search, sortType]);

  return  (
    <>
      {showForm && (
        <div className="flex items-center justify-center gap-2 mt-3 mb-5">
          <button onClick={() => setShowForm((p) => !p)} className="w-3 h-3">
            <img className="w-full h-full" src={CrossIcon} alt="" />
          </button>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full h-10 px-4 border border-gray-400 sm:w-1/2 rounded-3xl">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Items here..."
              className="w-full h-full px-1 outline-none"
            />
            <button>
              <Search />
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col sm:gap-3 sm:flex-row outfit">
        <Filters setSubCategory={setSubCategory} subCategory={subCategory} category={category} setCategory={setCategory} />
     
       {!isFetching ? <CollectionsComponent setSortType={setSortType} products={products} /> :  <div className='flex items-center justify-center w-full my-14'>
    <Oval   visible={true}
  height="30"
  width="30"
  color="gray"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  strokeWidthSecondary={5}
  strokeWidth={5}/></div>}


      </div>
    </>
  ) 
  
}

export default Collection;
