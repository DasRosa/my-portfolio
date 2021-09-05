import React, { useState, useEffect } from "react";
import sanityClient from '../client';
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react"

const buider = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return buider.image(source)
}
const About = () => {
    const [author, setAuthor] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`)
        .then((data) => setAuthor(data[0]))
        .catch(console.error)
    }, [])
    if(!author) return <diV claseName='loader'></diV>;
    return (
        <main className='about-center'>
            <div className='about-container'>
                <div className='author'>
                    <img src={urlFor(author.authorImage).url()} alt={author.name}/>
                    <div className='author-info'>
                        <h3>
                            Hello, I'm {" "}<span>{author.name}</span>!
                        </h3>
                        <BlockContent blocks={author.bio} projectId="rmf0l0ed" dataset="production" />
                    </div>   
                </div> 
            </div>    
        </main>
    )
}
export default About