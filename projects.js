// Projects Data for The Codency
const projects = [
    {
        id: 1,
        title: "Nexus E-commerce Platform",
        description: "A premium e-commerce solution with advanced inventory management and AI-powered recommendations.",
        category: "ecommerce",
        categoryName: "E-commerce",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
        year: 2023,
        featured: true,
        thumbnail: "assets/projects/nexus-thumb.jpg",
        video: "assets/projects/nexus-preview.mp4"
    },
    {
        id: 2,
        title: "Aura Design System",
        description: "A comprehensive design system for enterprise applications with reusable components and patterns.",
        category: "design",
        categoryName: "UI/UX Design",
        tech: ["Figma", "Storybook", "React", "Sass"],
        year: 2023,
        featured: true,
        thumbnail: "assets/projects/aura-thumb.jpg",
        video: "assets/projects/aura-preview.mp4"
    },
    {
        id: 3,
        title: "HealthTrack Pro",
        description: "A health and fitness tracking application with real-time analytics and personalized insights.",
        category: "mobile",
        categoryName: "Mobile App",
        tech: ["React Native", "Firebase", "GraphQL", "HealthKit"],
        year: 2023,
        featured: true,
        thumbnail: "assets/projects/healthtrack-thumb.jpg",
        video: "assets/projects/healthtrack-preview.mp4"
    },
    {
        id: 4,
        title: "Quantum Banking Portal",
        description: "Secure online banking platform with multi-factor authentication and real-time transaction processing.",
        category: "web",
        categoryName: "Web Development",
        tech: ["Vue.js", "Python", "PostgreSQL", "Docker"],
        year: 2023,
        featured: true,
        thumbnail: "assets/projects/quantum-thumb.jpg"
    },
    {
        id: 5,
        title: "Voyager Travel Platform",
        description: "Comprehensive travel booking and experience platform with AI-powered recommendations.",
        category: "web",
        categoryName: "Web Development",
        tech: ["React", "Next.js", "MongoDB", "Mapbox"],
        year: 2022,
        featured: false,
        thumbnail: "assets/projects/voyager-thumb.jpg"
    },
    {
        id: 6,
        title: "Nova Dashboard",
        description: "Enterprise dashboard for data visualization and business intelligence.",
        category: "design",
        categoryName: "UI/UX Design",
        tech: ["Figma", "React", "D3.js", "WebGL"],
        year: 2022,
        featured: false,
        thumbnail: "assets/projects/nova-thumb.jpg",
        video: "assets/projects/nova-preview.mp4"
    },
    {
        id: 7,
        title: "Flow Productivity Suite",
        description: "Project management and team collaboration tool with advanced workflow automation.",
        category: "web",
        categoryName: "Web Development",
        tech: ["Angular", "NestJS", "MySQL", "Redis"],
        year: 2022,
        featured: false,
        thumbnail: "assets/projects/flow-thumb.jpg"
    },
    {
        id: 8,
        title: "Spark Fitness App",
        description: "Gamified fitness application with social features and personalized workout plans.",
        category: "mobile",
        categoryName: "Mobile App",
        tech: ["Flutter", "Firebase", "Apple Health", "Google Fit"],
        year: 2021,
        featured: false,
        thumbnail: "assets/projects/spark-thumb.jpg"
    },
    {
        id: 9,
        title: "Echo Music Streaming",
        description: "High-fidelity music streaming platform with social sharing and discovery features.",
        category: "web",
        categoryName: "Web Development",
        tech: ["React", "Node.js", "PostgreSQL", "Web Audio API"],
        year: 2021,
        featured: false,
        thumbnail: "assets/projects/echo-thumb.jpg",
        video: "assets/projects/echo-preview.mp4"
    },
    {
        id: 10,
        title: "Canvas Design Studio",
        description: "Collaborative design tool for remote teams with real-time editing and version control.",
        category: "design",
        categoryName: "UI/UX Design",
        tech: ["Figma", "WebSockets", "Canvas API", "IndexedDB"],
        year: 2021,
        featured: false,
        thumbnail: "assets/projects/canvas-thumb.jpg"
    },
    {
        id: 11,
        title: "Marketplace Pro",
        description: "Multi-vendor marketplace platform with integrated payments and seller management.",
        category: "ecommerce",
        categoryName: "E-commerce",
        tech: ["React", "Django", "PostgreSQL", "Stripe Connect"],
        year: 2020,
        featured: false,
        thumbnail: "assets/projects/marketplace-thumb.jpg"
    },
    {
        id: 12,
        title: "Pulse Health Monitor",
        description: "Wearable health monitoring application with real-time alerts and doctor connectivity.",
        category: "mobile",
        categoryName: "Mobile App",
        tech: ["Swift", "Kotlin", "BLE", "WebSockets"],
        year: 2020,
        featured: false,
        thumbnail: "assets/projects/pulse-thumb.jpg",
        video: "assets/projects/pulse-preview.mp4"
    }
];

// Load Featured Projects
function loadFeaturedProjects() {
    const featuredContainer = document.getElementById('featuredProjects');
    if (!featuredContainer) return;
    
    const featured = projects.filter(project => project.featured);
    
    featured.forEach(project => {
        const projectCard = createProjectCard(project);
        featuredContainer.appendChild(projectCard);
    });
    
    // Initialize project card interactions
    if (window.initProjectCards) {
        window.initProjectCards();
    }
}

// Load All Projects
function loadAllProjects() {
    const projectsContainer = document.getElementById('allProjectsGrid');
    if (!projectsContainer) return;
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
    
    // Initialize project card interactions
    if (window.initProjectCards) {
        window.initProjectCards();
    }
    
    // Initialize load more functionality
    if (window.initLoadMore) {
        window.initLoadMore();
    }
}

// Create Project Card Element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    
    // Video or thumbnail
    const mediaContent = project.video 
        ? `
            <div class="project-media">
                <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
                <video class="project-video" muted loop playsinline data-src="${project.video}">
                    <source src="${project.video}" type="video/mp4">
                </video>
            </div>
        `
        : `
            <div class="project-media">
                <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
            </div>
        `;
    
    // Tech tags
    const techTags = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    card.innerHTML = `
        ${mediaContent}
        <div class="project-content">
            <span class="project-category">${project.categoryName}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
        </div>
    `;
    
    return card;
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('featuredProjects')) {
        loadFeaturedProjects();
    }
    
    if (document.getElementById('allProjectsGrid')) {
        loadAllProjects();
    }
});

// Export for use in main script
window.projects = projects;
window.loadFeaturedProjects = loadFeaturedProjects;
window.loadAllProjects = loadAllProjects;