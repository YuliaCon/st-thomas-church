import getAboutUs, {AboutUsQueryResponse} from '@/app/api/orchard/about-us';
import  {getChurchContactInfo, getChurchAdderss} from '@/app/api/orchard/church-info';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/images/PageBanner';
import {getSanitizedHtml} from '@/app/utils/sanitize';


export default async function AboutUsPage() {
    
    const response:AboutUsQueryResponse= await getAboutUs();
    // 1. Get the array from data (or response if extracted)
    const aboutUsArray = response?.data?.aboutUs || response?.aboutUs;
    // 2. Extract the first item from the array safely
    const aboutUsData = Array.isArray(aboutUsArray) ? aboutUsArray[0] : aboutUsArray;

    if (!aboutUsData) {
        notFound();
    }
    
    const {headerMain,subtitle, mainInformation, pageBanner, relatedBlog} = aboutUsData;
    const rawUrl = pageBanner?.image?.files?.[0]?.url;
    const imageUrl = rawUrl?.startsWith('//') ? `https:${rawUrl}` : rawUrl;

    //subtitle
    const subtitleCleanHtml=getSanitizedHtml(aboutUsData?.subtitle?.html);
    
    //get address and contact info

    const contactInfoHtml = await getChurchContactInfo();
    
    const {city, country, postalZIPcode,stateRegion, streetAddress }=getChurchAdderss();
    
    console.log({"aaaaaaaaaaaa": {city, country, postalZIPcode,stateRegion, streetAddress }});

    return (
        <>
           
            <h1>{headerMain.header}</h1>
            <h2
                dangerouslySetInnerHTML={{ __html: subtitleCleanHtml }}
            />
            <PageBanner
                src={pageBanner?.image?.files?.[0]?.url}
                alt={pageBanner?.imageDescription || "Banner"}
            />
            <p>{mainInformation.info}</p>
         
            <p
                dangerouslySetInnerHTML={{ __html: contactInfoHtml }}
            />
       </>
    )
}