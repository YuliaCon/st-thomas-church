import  {type BlogItem } from '@/app/types/blog';
import {orchardFetch} from '@/app/api/orchard/orchard-client';
import {getSanitizedHtml} from "@/app/utils/sanitize";

const GET_ALL_BLOGS_QUERY = `
  query {
      blogPost(orderBy: {modifiedUtc: DESC}) {
         contentItemId
         createdUtc
         modifiedUtc
         displayText
         image {
          files {
            url
            fileName
          }
        }
        markdownBody {
          html
        }
     }
  }
`;

interface OrchardDataPayload  {
    contentItemId: string;
    createdUtc: string;
    modifiedUtc:string;
    displayText: string;
    image: {
        files: Array<{
            url:string
            fileName:string;
        }>;
}
markdownBody: {
    html: string;       // Used for the Body
    }
}


export type ContentItem = {
    contentItemId: string;
    createdUtc: string;
    modifiedUtc: string;
    displayText:string;
    image: {
        files: Array<{
            url: string;
            fileName: string;
        }>;
    };
    markdownBody: {
        html: string;
    };
};

async function fetcBlogsRaw():Promise<OrchardDataPayload> {
    const response = await orchardFetch<OrchardDataPayload>({
        query: GET_ALL_BLOGS_QUERY,
    });
  
    return response;
}

export async function getBlogs(): Promise<BlogItem[] | null> {
    try {
        const response = await fetcBlogsRaw();

        if (!response) {
            console.error('No response from getBlogs() found');
            return null;
        }

        // 2. Extract the JSON body array from the response
        const rawItems: ContentItem = await response.blogPost; //delete YAC 
        

        const blogs: BlogItem[] = rawItems.map((raw) => ({
            id: raw.contentItemId,
            created: raw.reatedUtc,
            lastModifiedUtc: raw.modifiedUtc,
            displayText: raw.displayText,
            image: raw.image?.files || [],
            markdownBody: getSanitizedHtml(raw.markdownBody.html),
        }));
      //  console.log({'blogs from getBlogs()': blogs}); //dele YAC
        return blogs;
    } catch (e) {
        console.error(e);
        throw e;
    }
}



