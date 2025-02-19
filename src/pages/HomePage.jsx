import ServiceCard from '@/customComponents/ServiceCard'
import FeaturedCard from '@/customComponents/FeaturedCard'
import {LatestProducts} from '../customComponents/LatestProducts'
import Footer from '@/customComponents/FooterCard'


export const HomePage = () =>{
    return(
        <>
        
        <FeaturedCard/>
        <div className="flex items-center justify-center text-[2rem] mb-5 font-bold">
            
        </div>
        <LatestProducts/>
        <div className="flex items-center justify-center text-[2rem] mb-5 font-bold mt-5">
            <h1>What ApnaStore Offer!</h1>
        </div>
        <ServiceCard/>
        <Footer/>
        </>
    )
}