import React from 'react';

import mythicalCreatureImg from '../assets/ex/MythicalCreature.png';
import biodataImg from '../assets/ex/biodata.png';
import authWebsiteImg from '../assets/ex/Cuplikan layar 2025-07-15 063132.png';

const projectData = [
    {
        img: mythicalCreatureImg,
        title: 'Mythical Creatures',
        description: 'Reading website about mythical creatures'
    },
    {
        img: biodataImg,
        title: 'Biographies',
        description: 'Website for creating biographies and displaying data'
    },
    {
        img: authWebsiteImg,
        title: 'Authentification Website',
        description: 'Website for signing up and signing in'
    }
]

function Projects() {
    return (
        <section className="projects" id="projects">
            <div className="project">
                <h2>Projects</h2>
                <div className="project-container">
                    {projectData.map((project, index) => (
                    <div className="project-item" key={index}>
                    <img src={project.img} alt="Project" />
                    <div className="project-content">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                </div>
                ))}
                </div>
                <a href="http://localhost:5174/"><button>Learn More</button></a>
            </div>
        </section>
    )
}

export default Projects;