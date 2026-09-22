import {getBlogs} from '@/app/api/orchard/blogs';
import {BlogItem} from "@/app/types/blog";
import {BlogPost} from '@/components/ui/blogPost';


export default async function BlogsPage() {

        const blogs: BlogItem[] = await getBlogs();
       
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
        <div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem'}}>
                {sortedBlogs.map((blog) => (
                    <BlogPost key={blog.contentItemId} blog={blog}/>))}
            </div>
        </div>
    )

}