import React, { useState, useEffect } from "react";
import sanityClient from '../client';
import { FaArrowCircleRight, FaHandPointRight } from "react-icons/fa";

const Project = () => {
    const [projectData, setProjectData] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
        }`)
        .then((data) => setProjectData(data))
        .catch(console.error)
    }, [])

    return (
        <main>
            <section className='container'>
                <h2>Project</h2>
                <p>Welcome to my project page!</p>
                <div className='project-center'>
                {projectData && projectData.map((project) => (
                    <article className='project-item'>
                        <a 
                        href={project.link}
                        alt={project.title}
                        target="_blank"
                        rel="noopener noreferrer">
                            <h3>{project.title}</h3>
                        </a>
                        <div className='project-info'>
                            <div className='info'>
                                <span><strong>Date:</strong> {new Date(project.date).toLocaleDateString()}</span>
                                <span><strong>Location:</strong> {project.place}</span>
                                <span><strong>Type:</strong> {project.projectType}</span>
                            </div>
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                View project <FaArrowCircleRight />
                            </a>
                        </div>
                    </article>
                ))}
                </div>
            </section>
        </main>
    )
}
export default Project