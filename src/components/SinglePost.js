import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import sanityClient from '../client';
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { FaArrowLeft } from "react-icons/fa";

const buider = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return buider.image(source)
}
const SinglePost = () => {
    const [singlePost, setSinglePost] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url,
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image,
        }`)
        .then((data) => setSinglePost(data[0]))
        .catch(console.error)
    }, [slug])

    if(!singlePost) return <div className='loader'></div>;
    return (
        <main>
            <Link to="/post" className='pri-btn' style={{margin:'20px 30px 0'}}><FaArrowLeft /> back to post</Link>
            <article className='post-section'>
                <header>
                    <div className='post-header'>
                        <div className='container'>
                            <h1>{singlePost.title}</h1>
                            <div className='author-container'>
                                <img src={urlFor(singlePost.authorImage).url()} alt={singlePost.name} />
                                <p>{singlePost.name}</p>
                            </div>
                        </div>
                    </div>
                    <img 
                        src={singlePost.mainImage.asset.url} 
                        alt={singlePost.title} 
                        className='main-img'
                    />
                </header>
                <div className='block-content'>
                    <BlockContent blocks={singlePost.body} projectId="rmf0l0ed" dataset="production" />
                </div>
            </article>
        </main>
    )
}

export default SinglePost