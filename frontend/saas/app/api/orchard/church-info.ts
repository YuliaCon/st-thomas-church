import { cache } from 'react';
import {orchardFetch} from '@/app/api/orchard/orchard-client';
import {getSanitizedHtml} from "@/app/utils/sanitize";
import {Address} from "@/app/types/church-info";

/*
Instead of fetching media directly from Orcharch media folders, we are using media that is stored in the media content items
 Content items that store media:
    smallLogo
    gallery

 */


const GET_INFO_QUERY = `
query {
     contactinfo(first: 10) {
    markdownBody {
      html
    }
  }
  churchAddress(first: 1, orderBy: {published: DESC}) {
    address {
      city
      country
      postalZIPCode
      stateRegion
      streetAddress
    }
  }
 }
`;


interface OrchardDataPayload {
    data?: {
        contactinfo: {
            markdownBody:{
                html: string
            };
        };

    churchAddress: {
        address:{
            city:string;
            country:string;
            postalZIPCode: string;
            stateRegion: string;
            streetAddress: string;
            };
        };
    };
    errors?: Array<{
        message: string;
        locations?: Array<{ line: number; column: number }>;
        path?: Array<string | number>;
        extensions?: Record<string, any>;
    }>;
}


let cachedPayload: OrchardDataPayload | null = null;
async function fetchChurchInfoRaw():Promise<OrchardDataPayload> {
    if (cachedPayload) {
        return cachedPayload;
    }
    
    const response = await orchardFetch<OrchardDataPayload>({
        query: GET_INFO_QUERY,
    });

    cachedPayload = response;
    return response;
}

// 3. Extract and return the smallLogo property specifically
export async function getChurchContactInfo(): Promise<string | null> {
    try {
        const response = await fetchChurchInfoRaw();
        
        // 1. Check for missing response or GraphQL errors
        if (!response || response.errors ) {
            console.warn('⚠️ Request failed or returned errors:', response?.errors);
            return null;
        }
       
        // 2. Correct path to access html string based on your interface
        const rawHtml = response.contactinfo[0]?.markdownBody?.html;

        if (!rawHtml) {
            console.warn('⚠️ contactinfo markdownBody HTML is missing:', response);
            return null;
        }
        
        // 3. Sanitize and return
        const contactinfoCleanHtml = getSanitizedHtml(rawHtml);
        
        return contactinfoCleanHtml;

    } catch (error) {
        console.error('🚨 Error inside getChurchContactInfo:', error);
        return null;
    }
}

export async function getChurchAdderss(): Promise<Address | null> {
 
    try {
        const response = await fetchChurchInfoRaw();

        // 1. Check for missing response or GraphQL errors
        if (!response || response.errors ) {
            console.warn('⚠️ Request failed or returned errors:', response?.errors);
            return null;
        }

        // 2. Correct path to access html string based on your interface
        const rawHtml = response.churchAddress[0];
        
        if (!rawHtml) {
            console.warn('⚠️ contactinfo markdownBody HTML is missing:', response);
            return null;
        }
        
    
        const address:Address = {
            city:rawHtml.address.city,
            country:rawHtml.address.country,
            postalZIPCode: rawHtml.address.postalZIPCode,
            stateRegion: rawHtml.address.postalZIPCode,
            streetAddress:rawHtml.address.postalZIPCode
        }
        
    return  address;

    } catch (error) {
        console.error('🚨 Error inside getChurchContactInfo:', error);
        return null;
    }
}