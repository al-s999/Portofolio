import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const certificates = [
    { id: 1, url: 'experience/python_basic certificate.pdf', scale: 0.4 },
    { id: 2, url: 'experience/ITBox-Certificate_Data-Science-Course-Level-Basic_Ahmad-Rosyid-Al-fualdi.pdf', scale: 0.5 },
    { id: 3, url: 'experience/ITBox-Certificate_Data-Science-Course-Level-Intermediate_Ahmad-Rosyid-Al-fualdi.pdf', scale: 0.5 },
    { id: 4, url: 'experience/ITBox-Certificate_Data-Science-Course-Level-Advanced_Ahmad-Rosyid-Al-fualdi.pdf', scale: 0.5 },
];

function Resume() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingStates, setLoadingStates] = useState({});
    const canvasRefs = useRef([]);

   useEffect(() => {
            let renderTask = null;

            const renderPdf = async (cert, canvas, index) => {
                if (!canvas) return;
                
                setLoadingStates(prev => ({ ...prev, [index]: true }));

                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                try {
                    const loadingTask = pdfjsLib.getDocument(cert.url);
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: cert.scale });

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = { canvasContext: ctx, viewport: viewport };
                    renderTask = page.render(renderContext);
                    await renderTask.promise;

                } catch (error) {
                    if (error.name !== 'RenderingCancelledException') {
                        console.error('Error rendering PDF:', error);
                    }
                } finally {
                    setLoadingStates(prev => ({ ...prev, [index]: false }));
                }
            };

            renderPdf(certificates[currentIndex], canvasRefs.current[currentIndex], currentIndex);

            return () => {
                if (renderTask) {
                    renderTask.cancel();
                }
            };
        }, [currentIndex]);

        useEffect(() => {
            const autoSlideInterval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % certificates.length);
            }, 7000);

            return () => {
                clearInterval(autoSlideInterval);
            };
        }, [currentIndex]); 


        const goToNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
        };

        const goToPrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length);
        };

    return (
        <section className="resumes" id="resumes">
            <div className="resume">
                <h2>Resume</h2>
                <div className="resume-container">
                    <div className="resume-item">
                        <h3>Education</h3>
                        <p>I am currently a student at SMK Negeri 1 Dlanggu, majoring in Software Engineering . Beyond my formal schooling, I am deeply committed to independent learning. I actively expand my knowledge through various online resources, including AI (Artificial Intelligence) platforms, w3school.com, YouTube, hackerrank.com, and itbox.id. Furthermore, I had the valuable opportunity to participate in a 5-Day Gen AI Intensive Course with Google, which was conducted in collaboration with Kaggle. Through my self-study efforts on HackerRank and ITbox, I have successfully completed various courses and tests, earning several certificates, including a Python Basic Certificate from HackerRank and Data Science Course Certificates (Basic, Intermediate, and Advanced levels) from ITbox. My proficiency in programming languages includes Python, R, HTML, CSS, JavaScript, and PHP, and I utilize frameworks such as Laravel and Flask.</p>
                    </div>
                    <div className="resume-item">
                        <h3>Experience</h3>
                        <div className="experience-slider-container">
                            <div className="experience-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {certificates.map((cert, index) => (
                                <div id={`pdf-container-${cert.id}`} className="experience-slide" key={cert.id}>
                                    {loadingStates[index]}
                                    <canvas ref={el => canvasRefs.current[index] = el}></canvas>
                                </div>
                            ))}
                            </div>
                            <button onClick={goToPrev} className="experience-btn experience-prev">❮</button>
                            <button onClick={goToNext} className="experience-btn experience-next">❯</button>
                            <div className="experience-dots"></div>
                        </div>
                    </div>
                    <div className="resume-item">
                        <div className="skill">
                            <h3>Skills</h3>
                            <div className="skill-container">
                                <div className="skill-scroll">
                                    <div className="skill-item">
                                        <img src="logo/html-1.svg" alt="HTML" />       
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/css-3.svg" alt="CSS" />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/javascript-r.svg" alt="JavaScript" />       
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/Java_(programming_language)-Logo.wine.svg" alt="Java" />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/Laravel-Logo.wine.svg" alt="Laravel" />       
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/python-5.svg" alt="Python" />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/r-lang.svg" alt="R" />
                                    </div>
                                    <div className='skill-item'>
                                        <img src='logo/react.svg' alt='React' />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/html-1.svg" alt="HTML" />       
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/css-3.svg" alt="CSS" />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/javascript-r.svg" alt="JavaScript" />       
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/Java_(programming_language)-Logo.wine.svg" alt="Java" />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/Laravel-Logo.wine.svg" alt="Laravel" />       
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/python-5.svg" alt="Python" />
                                    </div>
                                    <div className="skill-item">
                                        <img src="logo/r-lang.svg" alt="R" />
                                    </div>
                                    <div className='skill-item'>
                                        <img src='logo/react.svg' alt='React' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Resume;