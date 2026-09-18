import {getBlogs} from '@/app/api/orchard/blogs';
import {BlogItem} from "@/app/types/blog";

// 1. Define the GraphQL query to fetch the content items
// NOTE: Orchard Core dynamically builds query fields using camelCase based on Content Type names.

// const GET_ALL_BLOGS_QUERY = `
//   query {
//     blogPost(status: LATEST) {
//        contentItemId
//        createdUtc
//        displayText
//        markdownBody {
//            html
//        }
//     }
//   }
// `;
//
// interface BlogPost {
//     contentItemId: string;
//     createdUtc:string;
//     displayText:string;
//     markdownBody: {
//         html: string;       // Used for the Body
//     };
// }
//
// async function getAllBlogs(): Promise<BlogPost[]> {
//    
//     // 1. URL-encode the GraphQL query string
//     const queryParam = encodeURIComponent(GET_ALL_BLOGS_QUERY);
//
//     // 2. Append it as a query string parameter (?query=...)
//     const endpoint = `${process.env.NEXT_PUBLIC_ORCHARD_URL}/api/graphql/?query=${queryParam}`;
//     try {
//         const res = await fetch(endpoint, {
//             method: 'GET', // 👈 Switch from POST to GET
//             headers: {
//                 'Accept': 'application/json',
//             },
//             next: {revalidate: 0},
//         });
//         console.log({'res':res}); // delete YAV
//         if (!res.ok) {
//             throw new Error(`Failed to fetch blogs: ${res.statusText}`);
//         }
//
//         const json = await res.json();
//         return json.data?.blogPost || [];
//     } catch (networkError: any) {
//         // This catches low-level network issues (DNS failure, CORS, connection refused)
//         console.log("🚨 Low-Level Fetch Network Failure:", networkError.message || networkError);
//         throw networkError;
//     }
// }

export default async function BlogsPage() {

        const blogs: BlogItem[] = await getBlogs();
        console.log({'blogs from the blogs page': blogs}); //delete YAC 
       
        if (blogs.length === 0) {
            return (
                <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                    <h1>Blogs</h1>
                    <p>No blog posts found. Make sure you have created and published posts in Orchard Core.</p>
                </div>
            );
        }

    // 1. Sort the blog posts by date: latest (newest) first
    const sortedBlogs = [...blogs].sort((a, b) =>
        new Date(b.createdUtc).getTime() - new Date(a.createdUtc).getTime()
    );

        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
                <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>Latest Blog Posts</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                    {sortedBlogs.map((blog) => (
                        <article
                            key={blog.contentItemId}
                            style={{ border: '1px solid #e1e1e1', padding: '1.5rem', borderRadius: '8px' }}
                        >
                            {/* Header */}
                            <header>
                                <h2 style={{ margin: '0 0 0.5rem 0', color: '#1a1a1a' }}>
                                    {blog.displayText || "Untitled Post"}
                                </h2>
                                {blog.lastModifiedUtc && (
                                    <small style={{ color: '#666' }}>
                                        Published on: {new Date(blog.lastModifiedUtc).toLocaleDateString()}
                                    </small>
                                )}
                            </header>
                            <section>
                                <img
                                src={blog.image[0].url}
                                alt={blog.image[0].fileName  || "Blog image" }
                                style={{ height: '200px', width: 'auto' }} />
                            </section>
                            {/* Body */}
                            <div style={{ marginTop: '1rem', lineHeight: '1.6', color: '#333' }}>
                                {blog.markdownBody? (
                                    /* Using dangerouslySetInnerHTML because Orchard Core HTML fields return raw HTML strings */
                                    <div dangerouslySetInnerHTML={{ __html: blog.markdownBody }} />
                                ) : (
                                    <p>No content available for this post.</p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
       )

}