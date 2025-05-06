import React from 'react'
import Carousel from '../components/Carousel'
import Sections from '../components/Sections'
import NewArrivals from '../components/NewArrivals'

import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import BrandInfo from '../components/BrandInfo'
import EmailAlerts from '../components/EmailAlerts'
function Home() {
    const images = [
        "//www.limelight.pk/cdn/shop/files/main-banner_982f5ab5-093b-473c-9260-b72076366934.jpg?v=1742377909&amp;width=3840",
        "//www.limelight.pk/cdn/shop/files/Swipe_banner_Ramsha_Web.png?v=1741775282&amp;width=3840",
        "//www.limelight.pk/cdn/shop/files/lawn_unstitched_iqra_pc.jpg?v=1741677577&amp;width=3840"
      ]
  return (
    <div className=''>
      
      <NewArrivals/>
     <LatestCollection/>
     <BestSellers/>
     <BrandInfo/>
     <EmailAlerts/>
    </div>
  )
}

export default Home
