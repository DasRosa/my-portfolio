import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from '../client';

const Post = () => {
    const [postData, setPostData] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "post"]{
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            },
            publishedAt,
            "name": author->name,
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
    }, [])
    // if(!postData) return <div className='loader'></div>;
    return (
        <main>
            <section className='container'>
                <h2>Blog Post</h2>
                <p>Welcome to my blog posts page!</p>
                <div className='post-center'>
                {postData && postData.map((post, index) => (
                    <article className='post-item' key={index}>
                        <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                            <img src={post.mainImage.asset.url} alt={post.mainImage.alt}/>
                        </Link>
                        <div className='post-info'>
                            <h3>{post.title}</h3>
                            <h4>{post.name}</h4>
                            <div className='date-time'>
                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                <span style={{textAlign:'right'}}>{new Date(post.publishedAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </article>
                ))}
                </div>
            </section>
        </main>
    )
}

export default Post