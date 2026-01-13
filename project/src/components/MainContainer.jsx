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
    {
        id: "project4",
        title: "Phishing Email Classification",
        image: "ex/Cuplikan layar 2025-10-09 210947.png",
        summary: "A prototype model to classify whether an email is phishing or legitimate using fine-tuned machine learning techniques.",
        description: "This project is a prototype built on Kaggle to classify emails as phishing or non-phishing using a fine-tuned model. It focuses on data preprocessing, feature extraction, and model training using Python libraries such as Pandas and NumPy. The model aims to enhance cybersecurity by detecting suspicious email patterns and preventing phishing attacks. The implementation demonstrates an end-to-end machine learning pipeline, including data cleaning, visualization, and model evaluation. This notebook serves as a foundation for further improvements in real-world email security applications.",
        technologies: ["Python", "Kaggle", "Machine Learning"]
    },
    {
        id: "project5",
        title: "Mental Health Assistant",
        image: "ex/Cuplikan layar 2025-10-09 211002.png",
        summary: "A Gemini-based fine-tuned model that provides empathetic responses to users by learning from psychiatrist-patient conversation datasets.",
        description: "This project is a prototype AI model created on Kaggle using Python, retrained from the Gemini Flash model with a dataset of psychiatrist-patient dialogues. The main goal is to develop an AI assistant that can respond empathetically to mental health-related queries. It demonstrates fine-tuning techniques for conversational AI to better understand emotional context and deliver supportive replies. The notebook showcases the preparation of datasets, model retraining, and evaluation phases. This project serves as a learning example of applying fine-tuning to enhance AI responses in mental health support scenarios.",
        technologies: ["Python", "Gemini Flash", "Kaggle", "AI Fine-Tuning"]
    },
    {
        id: "project6",
        title: "Random Group Generator",
        image: "ex/rng.png",
        summary: "A web-based random name generator designed to fairly distribute participants into multiple groups with an intuitive dark-mode interface.",
        description: "This project is a web-based Random Group Generator developed to simplify the process of randomly selecting participants and dividing them into multiple groups. The interface, as shown in the image, allows users to input participant names manually or import them directly from CSV or Excel files, making it suitable for classrooms, events, and team-based activities.\n\nThe application features a real-time random name picker (RNG) that visually highlights the selected participant and tracks the remaining number of participants. Users can specify the number of groups, generate random results one by one or all at once, and view the distribution of participants across each group. The dark-mode UI was intentionally designed to provide a modern, focused, and presentation-friendly experience.\n\nThis project demonstrates the implementation of randomization logic, dynamic state updates, file import handling, and clean UI/UX design. It serves as a practical example of building an interactive utility tool that prioritizes fairness, usability, and clarity in group management scenarios.",
        technologies: [
            "NextJs",
            "Tailwind",
            "Typescript",
            "framer-motion",
            "PapaParse"
        ],
        websiteUrl: "https://github.com/al-s999/RNG-Group-Classifier"
    }
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
                <a href={project.websiteUrl} className="visit-btn" target="_blank" rel="noopener noreferrer">See Projects</a>
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