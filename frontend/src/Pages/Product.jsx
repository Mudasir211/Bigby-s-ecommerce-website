import { useNavigate, useParams } from "react-router-dom"
import { assets, products } from "../assets/frontend_assets/assets"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RelatedProducts from "../components/RelatedProducts"
import { useAddtoCartMutation, useGetMeQuery, useGetProductsQuery, useGetReviewsQuery } from "../services/createApi"
import { toast, ToastContainer } from "react-toastify"
import { actions } from "../services/slice"
import { nanoid } from "nanoid"
import ReviewsList from "../components/ReviewsList"
import { Oval } from "react-loader-spinner"
import StarRating from "../components/StarRating"
import AverageStars from "../components/AverageStars"



function Product() {
 
    const navigate = useNavigate()
    const {productId} = useParams()
  




     const { data : reviewsData,refetch  } = useGetReviewsQuery(productId);

  const averageRating =
    reviewsData?.reviews?.length > 0
      ? (
          reviewsData.reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviewsData.reviews.length
        ).toFixed(1)
      : 'No ratings yet';

    
      const totalReviews = reviewsData?.reviews?.length || 0
    const [option,setOption] = useState(false)
    const {data:userData,isSuccess} =useGetMeQuery()
    
    const [addtoCart] =useAddtoCartMutation()
    const dispatch =useDispatch()
    const [selectSize,setSelectSize]=useState('')
    const succcessNotify =()=>toast.success('Item added to cart',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        })


    const notify =()=>toast.error('Please Select A Size',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        })

    
    const {isfetching,data=[]} = useGetProductsQuery()
    const [product,setProduct]=useState()

    if (isfetching){return <p>Loading</p>}
const productData = data


 const [imageUrl,setImageUrl]=useState()

const fetchData = () =>{
   const found = productData.find((item)=>item._id===productId)
   
   if (found){
    setImageUrl(found.image[0])
    setProduct(found)

   }
       
}
 

  useEffect(() => {
    if (productData.length > 0) {
        fetchData();
        refetch()
      }
  }, [productId,data])
  
const directOrder = ()=>{
    selectSize.length>0 &&  dispatch(actions.addOrderItem({productId:product._id,name:product.name,price: product.price,size: selectSize,imgUrl:product.image[0],quantity: +1,_id:nanoid()} )) 
   selectSize.length>0 && navigate("/place-order")
    
}   
   
  const add =()=>{
    selectSize.length<=0 && notify()
        if (isSuccess) {
             selectSize.length>0 && addtoCart({productId:product._id ,name:product.name,price: product.price,size: selectSize,imgUrl:product.image[0],quantity: +1})
        } else {
            selectSize.length>0 &&  dispatch(actions.addItem({productId:product._id,name:product.name,price: product.price,size: selectSize,imgUrl:product.image[0],quantity: +1,_id:nanoid()} )) 
        }
       
        
        selectSize.length>0 && succcessNotify()
  }   
  return product ? (
     <div className="mt-5 outfit">
  
   
<div className="flex flex-col pt-5 sm:flex-row">


<div className="flex flex-col flex-1 gap-2 sm:w-1/2 sm:flex-row-reverse" > <div className="w-full sm:w-[80%]"> <img className="w-full h-auto " src={imageUrl} alt="" /></div><div className="sm:flex grid grid-cols-4 gap-3 sm:w-[18.7%] sm:h-full sm:flex-col">
    
  {product.image.map((img,i)=> <button key={i} className={`${img===imageUrl && "border-2 sm:w-full border-orange-400"}`} onClick={()=>{setImageUrl(img);}}>< img  src={img} className=""  alt="" /></button>)} </div></div>

  <div className="break-all whitespace-normal sm:w-1/2 sm:px-8">
  <div className="flex flex-col gap-4 py-8 sm:p-0"><h1 className="text-2xl">{product.name}</h1>
  <div className="flex items-center gap-1"><AverageStars averageRating={averageRating}/> &nbsp; ({totalReviews})</div>
  <h1 className="text-2xl font-semibold">${product.price}</h1>
  <p className=" opacity-70">{product.description}</p>
  </div>
    
<div className="mb-10 space-y-5"><h1>Select Size</h1><div>{product.sizes.map((size,i)=><button onClick={(e)=>setSelectSize(size)} key={i} className={`p-2 px-4 ${size===selectSize && 'border border-orange-400'} mr-2 bg-gray-100 `}>{size}</button>)}</div> <div className="space-y-1.5">
<button onClick={add} className="py-3 text-sm text-white bg-black px-7">ADD TO CART</button><br /><button onClick={directOrder} className="w-[146.98px] py-2.5 text-sm text-white bg-yellow-300 px-7">BUY NOW</button></div>

<div className="flex flex-col gap-1 py-5 mt-5 text-sm text-gray-500 border-t border-gray-300"><p>100% Original product.</p><p>Cash on delivery is available on this product.</p><p>Easy return and exchange policy within 7 days.</p></div>
</div></div></div>
<div className="my-20 sm:my-5"><div className="flex"><p className={`px-5 cursor-pointer py-3 text-sm border ${!option && "border-[#00000073]"}`} onClick={()=>setOption(false)}>Description</p><p className={`px-5 py-3 text-sm border ${option && "border-[#00000073]"} cursor-pointer`} onClick={()=>setOption(true)}>Reviews ({totalReviews})</p></div>{!option ? <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border"><p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p><p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p></div> : <ReviewsList/>}</div>
<RelatedProducts category={product.category}/>
    </div>

  ) :( <div className='flex items-center justify-center w-full my-14'>
      <Oval   visible={true}
    height="30"
    width="30"
    color="gray"
    ariaLabel="oval-loading"
    wrapperStyle={{}}
    wrapperClass=""
    strokeWidthSecondary={5}
    strokeWidth={5}/></div>
  
  
        )
}

export default Product
