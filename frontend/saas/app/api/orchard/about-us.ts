const GET_ABOUT_US_QUERY = `
query {
    aboutUs (first: 1) {
       mainInformation {
          info
        }
        pageBanner {
          imageDescription
          image {
            files {
              url
            }
          }
        }
        headerMain {
          header
        }
        subtitle {
         
            html
          
        }
        relatedBlog {
          contentItemIds(first: 10)
        }
        additionalinformation {
          html
        }
        displayText
      }
  }
`


export interface AboutUsQueryResponse {
    data?: {
        aboutUs?: {
            mainInformation?: {
                info?: string;
            };
            pageBanner?: {
                imageDescription?: string;
                image?: {
                    files?: {
                        url?: string;
                    }[];
                };
            };
            headerMain?: {
                header?: string;
            };
            subtitle?: {
                    html?: string;
            };
            relatedBlog?: {
                contentItemIds?: string[];
            };
            additionalinformation?: {
                html?: string;
            };
            displayText?: string;
        }[]; // Array because Orchard returns list queries as arrays
    };
}

export default async function getAboutUs(): Promise<AboutUsQueryResponse> {

    const queryParam: string = encodeURIComponent(GET_ABOUT_US_QUERY);
    const endpoint = `${process.env.NEXT_PUBLIC_ORCHARD_URL}/api/graphql/?query=${queryParam}`;

    try {
         
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query:  GET_ABOUT_US_QUERY ,
            }),
            next: {revalidate: 60},
        });
        
        return res.json();

    } catch (networkError: any) {
        // This catches low-level network issues (DNS failure, CORS, connection refused)
        console.log("🚨 Low-Level Fetch Network Failure:", networkError.message || networkError);
        throw networkError;
    }
}