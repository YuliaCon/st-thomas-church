import getAboutUs, {AboutUsQueryResponse} from '@/app/api/orchard/about-us';
import  {getChurchContactInfo, getChurchAdderss} from '@/app/api/orchard/church-info';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/images/PageBanner';
import {getSanitizedHtml} from '@/app/utils/sanitize';
import {AboutUsData} from '@app/types/church-info';


export default async function AboutUsPage() {
    
    const aboutUsData:AboutUsData= await getAboutUs();
    
    if (!aboutUsData) {
        notFound();
    }
    
    console.log({'aboutUsData from about us page':aboutUsData});
    
    const {headerMain,subtitle, mainInformation, pageBanner, relatedBlog} = aboutUsData;
    const rawUrl = pageBanner[0]?.url;
    const pageBannerUrl = rawUrl?.startsWith('//') ? `https:${rawUrl}` : rawUrl;

    //subtitle
    const subtitleCleanHtml=getSanitizedHtml(aboutUsData?.subtitle);
    
    //get address and contact info

    const contactInfoHtml = await getChurchContactInfo();
    
    const {city, country, postalZIPcode,stateRegion, streetAddress }=getChurchAdderss();
    
   // console.log({"address from the about us page": {city, country, postalZIPcode,stateRegion, streetAddress }}); 

    return (
        <>
           
            <h1>{headerMain}</h1>
            <h2
                dangerouslySetInnerHTML={{ __html: subtitleCleanHtml }}
            />
            <p>{mainInformation} </p>
            <PageBanner
                src={pageBannerUrl}
                alt={pageBanner?.imageDescription || "Banner"}
            />
            <p>{mainInformation.info}</p>
         
            <p
                dangerouslySetInnerHTML={{ __html: contactInfoHtml }}
            />
       </>
    )
}