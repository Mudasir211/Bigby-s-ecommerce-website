import React, { useEffect, useState } from 'react';
import { assets } from '../assets/admin_assets/assets';

import { useUploadImageMutation } from '../services/cloudinary';
import Loading from '../assets/loading.gif'
import { useAddProductMutation } from '../services/createApi';
import { toast, ToastContainer } from 'react-toastify';
function AddProduct() {

    const [addProduct,{isSuccess,isError,error}] = useAddProductMutation() 
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [prodName,setProdName] = useState('')

  const [prodDesc,setProdDesc] = useState('')

  const [prodCategory,setProdCategory] = useState('Men')
  const [prodSubCategory,setProdSubCategory] = useState('Topwear')
  const [prodPrice,setProdPrice] = useState('')
  const [prodSize,setProdSize] = useState([])
  const [bestseller,setBestseller] = useState(false)
  const [uploadImage, { isLoading, }] = useUploadImageMutation();
  const notify = (type, message) => {
    if (type === 'error') {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } else if (type === 'success') {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }
  const handleImageChange = async (e,setImage) => {
    
    
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file).unwrap();
      const croppedUrl = response.secure_url.replace('/upload/', '/upload/c_fill,w_390,h_450/');
setImage(croppedUrl);
      
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };
  const setSize = (e)=>{

    if (prodSize.includes(e.target.innerText)){
        let copy = [...prodSize]
        setProdSize(copy.filter(item=>item !== e.target.innerText))
    }else{
        setProdSize(prev=>[...prev,e.target.innerText])
       
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   if(image1 && prodSize.length>0){
    addProduct({ name: prodName,
        description: prodDesc,
        price: prodPrice,
        image: [image1,image2,image3,image4],
        category: prodCategory,
        subCategory: prodSubCategory,
        sizes: prodSize,
        bestseller: bestseller,})
                      
   }else if(!image1){notify('error','You must add the first image')}
    else(notify('error','You must select atleast one size'))
    

  }
  useEffect(() => {
                    if (isError && error) {
                      notify('error',error?.data.message)
                      
                    }else if (isSuccess){
                        notify('success','Item added Successfully') 
                        
                       }
                  }, [isError, error,isSuccess]);
  return (
    <>
   <ToastContainer position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick={true}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                            theme="light"
                             />
   <form onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-3"><p className="mb-2">Upload Image</p><div className="flex [&>*]:cursor-pointer gap-2"><label htmlFor="image1"><img className="w-20" src={ image1? image1:  assets.upload_area} alt=""/><input onChange={(e)=>handleImageChange(e,setImage1)} type="file"  id="image1"  className='hidden'/></label><label  htmlFor="image2"><img className="w-20" src={ image2? image2:  assets.upload_area} alt=""/><input  onChange={(e)=>handleImageChange(e,setImage2)} type="file" id="image2" className='hidden' /></label><label  htmlFor="image3"><img className="w-20" src={ image3? image3:  assets.upload_area} alt=""/><input  onChange={(e)=>handleImageChange(e,setImage3)} type="file" id="image3" className='hidden' /></label><label  htmlFor="image4"><img className="w-20" src={ image4? image4:  assets.upload_area} alt=""/><input  onChange={(e)=>handleImageChange(e,setImage4)} type="file" id="image4"  className='hidden'/></label>{isLoading && <img src={Loading} className='w-10 h-10 m-auto' alt="" /> }</div><div className="w-full"><p className="mb-2">Product name</p><input maxLength={50} className="w-full outline-[#c586a5] max-w-[500px] px-3 py-2" type="text" value={prodName} onChange={(e)=>setProdName(e.target.value)} placeholder="Type here" required/></div><div className="w-full"><p className="mb-2">Product description</p><textarea maxLength={120} value={prodDesc} onChange={(e)=>setProdDesc(e.target.value)} className="w-full outline-[#c586a5] max-w-[500px] px-3 py-2" type="text" placeholder="Write content here" required></textarea></div><div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8"><div><p className="mb-2">Product category</p><select onChange={(e)=>setProdCategory(e.target.value)} className="w-full outline-[#c586a5] px-3 py-2"><option value="Men">Men</option><option value="Women">Women</option><option value="Kids">Kids</option></select></div><div><p className="mb-2">Sub category</p><select onChange={(e)=>setProdSubCategory(e.target.value)} className="w-full outline-[#c586a5] px-3 py-2"><option value="Topwear">Topwear</option><option value="Bottomwear">Bottomwear</option><option value="Winterwear">Winterwear</option></select></div><div><p className="mb-2">Product Price in $USD</p><input className="w-full outline-[#c586a5] px-3 py-2 sm:w-[120px]" required value={prodPrice} onChange={(e)=> e.target.value.length < 4 &&e.target.value>=0 &&  setProdPrice(e.target.value)} type="Number" placeholder="25" /></div></div><div><p className="mb-2">Product Sizes</p><div className="flex gap-3"><div><p onClick={setSize} className={`px-3 py-1 cursor-pointer  ${prodSize.includes("S")?' bg-pink-100':'bg-slate-200'}`}>S</p></div><div><p onClick={setSize} className={`px-3 py-1 cursor-pointer ${prodSize.includes("M")?' bg-pink-100':'bg-slate-200' }`}>M</p></div><div><p onClick={setSize} className={`px-3 py-1 cursor-pointer  ${prodSize.includes("L")?'bg-pink-100':'bg-slate-200'}`}>L</p></div><div><p onClick={setSize} className={`px-3 py-1 cursor-pointer  ${prodSize.includes("XL")?' bg-pink-100':'bg-slate-200'}`}>XL</p></div><div><p onClick={setSize} className={`px-3 py-1 cursor-pointer  ${prodSize.includes("XXL")?' bg-pink-100':'bg-slate-200'}`}>XXL</p></div></div></div><div className="flex gap-2 mt-2"><input onChange={()=>setBestseller(true)} type="checkbox" id="bestseller"/><label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label></div><button type="submit" className="py-3 mt-4 text-white bg-black w-28">ADD</button></form></>
  );
}

export default AddProduct;
