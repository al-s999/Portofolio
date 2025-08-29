import React, { useState, useEffect, useRef } from 'react';

// Data proyek dengan path gambar yang sudah diperbaiki
const projectsData = [
    {
        id: "project1",
        title: "Mythical Creature",
        image: "ex/MythicalCreature.png",
        summary: "On this website, I created it with Laravel for the backend and used a technique called page templating to make it easy for users to use and to load pages quickly.",
        description: "This website, titled 'CATATAN LEGENDA: MAKHLUK MITOLOGI' (Legendary Notes: Mythological Creatures), was developed as a personal project to deepen my understanding of how template inheritance works within the Laravel backend framework. My goal was to create a platform that showcases various mythological creatures from different cultures, each accompanied by its own story. \n\n On this website, I created it with Laravel for the backend and used a technique called page templating to make it easy for users to use and to load pages quickly. On the front end, I still use standard web programming languages (HTML, CSS, JavaScript). The site features a clean and organized layout, displaying several mythical creatures such as Chimera, Cerberus, Hydra, Phoenix, Kelpie, and Minotaur, each presented with an image and a brief description. This project effectively demonstrates the application of template inheritance in providing a consistent structure while allowing for dynamic content specific to each mythological story.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Laravel 12", "Template Inheritance"],
        websiteUrl: "https://github.com/al-s999/MythicalCreature"
    },
    {
        id: "project2",
        title: "Biodata Form",
        image: "ex/biodata.png",
        summary: "On this website, I created a CRUD website with standard programming languages.",
        description: "My primary objective was to learn how to implement full CRUD (Create, Read, Update, Delete) operations within a web application. \n\n The website, as shown in the image, features a 'Biodata' form where users can input personal information such as Name, Address, Place of Birth, Date of Birth, Gender, Religion, and Hobby. Upon submission, this data can be created, viewed, edited, and deleted. For the backend, I utilized Javascript to handle the data processing and database interactions, while the frontend was built using standard web programming languages (HTML, CSS, JavaScript).",
        technologies: ["HTML5", "CSS3", "JavaScript", "CRUD Operations"],
        websiteUrl: "https://github.com/al-s999/biodata-form"
    },
    {
        id: "project3",
        title: "Authentication Website",
        image: "ex/Cuplikan layar 2025-07-15 063132.png",
        summary: "On this website, I create a Authentificaton website using Laravel and React.js.",
        description: "This project is a web application built to explore and implement authentication systems, utilizing Laravel for the backend and React for the frontend. The image provided showcases the 'Sign In' and 'Sign Up' interfaces, indicating a core focus on user management. On the left, users can sign in using their email and password, or through social login options such as Google, Facebook, and GitHub, demonstrating the implementation of OAuth for external authentication. The 'Forgot Your Password?' link suggests a robust password recovery mechanism is also in place. On the right, the 'Hello, Friend!' section encourages new users to register, highlighting the full access they gain to site features upon signing up. This architectural choice, combining Laravel's powerful backend capabilities with React's dynamic and responsive frontend, allows for a comprehensive study of secure user authentication flows, including registration, login, password management, and social logins. The project serves as a practical learning tool to understand the intricacies of token-based authentication, session management, and data security in a full-stack environment.",
        technologies: ["React.js", "Laravel 12"],
        websiteUrl: "https://github.com/al-s999/Authentification-page"
    },
];

// Komponen untuk menampilkan grid semua proyek
function ProjectGrid({ onProjectSelect }) {
    // useEffect untuk menangani animasi scroll
    useEffect(() => {
        const elements = document.querySelectorAll('.project.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Hentikan observasi setelah animasi muncul
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });

        // Cleanup observer saat komponen tidak lagi ditampilkan
        return () => observer.disconnect();
    }, []); // Array kosong [] berarti efek ini hanya berjalan sekali saat komponen dimuat

    return (
        <div className="index_project">
            {projectsData.map((project) => (
                <div className="project fade-in" key={project.id}>
                    <h3>{project.title}</h3>
                    <img src={project.image} alt={`${project.title} Image`} />
                    <p>{project.summary}</p>
                    {/* onClick akan memanggil fungsi dari parent untuk mengubah state */}
                    <button onClick={() => onProjectSelect(project.id)}>Read More</button>
                </div>
            ))}
        </div>
    );
}

// Komponen untuk menampilkan detail satu proyek
function ProjectDetail({ project, onGoBack }) {

    const detaiViewref = useRef(null);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (detaiViewref.current) {
                detaiViewref.current.classList.add('visible');
            }
        }, 100)

        return () => clearTimeout(timer); // Cleanup timer saat komponen tidak lagi ditampilkan
    }, []);

    return (
        <div className="detail-view fade-in" ref={detaiViewref}>
            {/* Tombol kembali yang memanggil fungsi dari parent */}
            <button onClick={onGoBack} className="back-to-grid">← Back</button>
            <div className="project-detail">
                <h2>{project.title}</h2>
                <img src={project.image} alt={project.title} className="featured-image" />
                <div className="project-description">
                    {/* Memisahkan paragraf berdasarkan baris baru */}
                    {project.description.split('\n\n').map((para, index) => <p key={index}>{para}</p>)}
                </div>
                <h3>Technologies Used</h3>
                <div className="tech-stack">
                    {project.technologies.map(tech => <span key={tech} className="tech-item">{tech}</span>)}
                </div>
                <a href={project.websiteUrl} className="visit-btn" target="_blank" rel="noopener noreferrer">Go to the GitHub project</a>
            </div>
        </div>
    );
}


// Komponen Utama (Halaman Proyek)
function ProjectsPage() {
    // State untuk menyimpan ID proyek yang dipilih
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // Fungsi untuk menangani saat sebuah proyek diklik
    const handleProjectSelect = (projectId) => {
        setSelectedProjectId(projectId);
        window.scrollTo(0, 0); // Scroll ke atas halaman
    };

    // Fungsi untuk kembali ke tampilan grid
    const handleGoBack = () => {
        setSelectedProjectId(null);
    };

    // Cari data proyek yang dipilih berdasarkan ID
    const selectedProject = projectsData.find(p => p.id === selectedProjectId);

    return (
        <div className="main_container_project">
            {/* Tampilkan komponen Detail atau Grid berdasarkan state */}
            {selectedProject ? (
                <ProjectDetail project={selectedProject} onGoBack={handleGoBack} />
            ) : (
                <ProjectGrid onProjectSelect={handleProjectSelect} />
            )}
        </div>
    );
}

export default ProjectsPage;