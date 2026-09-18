import {ImageFile} from "@/app/types/media";

export interface Address {
    city:string;
    country:string;
    postalZIPCode: string;
    stateRegion: string;
    streetAddress:string;
}


export interface AboutUsData {
    headerMain:string;
    subtitle:string;
    mainInformation:string;
    pageBanner:ImageFile[];
    relatedBlogIDs:string[];
}