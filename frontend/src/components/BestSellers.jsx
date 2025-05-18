import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../services/createApi';
import { Oval } from 'react-loader-spinner';

function BestSellers() {
  const navigate = useNavigate();
  const { isFetching, data = [] } = useGetProductsQuery();

  // Filter only best sellers
  const bestSellers = data.filter((item) => item.bestseller === true);

  return (
    <div className="flex flex-col items-center gap-10 border-b-2 mb-14 pb-14">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl outfit">
          <span className="opacity-70">BEST</span> SELLERS
          <span className="h-[2px] w-8 bg-black"></span>
        </h2>
        <p className="opacity-70">Explore our bestseller collection!</p>
      </div>

      {/* Loader */}
      {isFetching ? (
        <div className="flex items-center justify-center w-full my-14">
          <Oval
            visible={true}
            height={40}
            width={40}
            color="gray"
            ariaLabel="oval-loading"
            secondaryColor="lightgray"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5">
          {bestSellers.map((item) => (
            <div
              onClick={() => navigate(`/product/${item._id}`)}
              key={item._id}
              className="flex flex-col gap-2 text-xs break-all whitespace-normal cursor-pointer group"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image[0] || item.image[1] || item.image[2]}
                  className="transition-all delay-50 group-hover:scale-110"
                  alt={item.name}
                />
              </div>
              <div className="[&>p]:opacity-70 flex flex-col gap-1 px-2">
                <p>{item.name}</p>
                <p className="font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BestSellers;
