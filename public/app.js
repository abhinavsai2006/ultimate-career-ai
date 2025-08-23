// --- Firebase Integration (Browser CDN) ---
// Make sure these scripts are in your index.html before app.js:
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>

const firebaseConfig = {
    apiKey: "AIzaSyCxrs3HPUNRr4htFPrqdFcgyn5N9n3JUNo",
    authDomain: "ai-career-advisor-3b672.firebaseapp.com",
    projectId: "ai-career-advisor-3b672",
    storageBucket: "ai-career-advisor-3b672.firebasestorage.app",
    messagingSenderId: "780767646295",
    appId: "1:780767646295:web:6247ecb2a0e8f733544912",
    measurementId: "G-VWH0ZH9V7N"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const db = firebase.firestore();

// Log a sample event
analytics.logEvent('app_loaded');

// Function to log custom events
async function logCustomEvent(eventName, eventData = {}) {
    try {
        analytics.logEvent(eventName, eventData);
        // Also store in Firestore for analytics
        await db.collection("events").add({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
    } catch (e) {
        console.error('Failed to log event:', e);
    }
}
// Ultimate AI Career Advisor - Fixed Implementation
class UltimateCareerAdvisorApp {
    constructor() {
        this.currentPage = 'landing';
        this.currentQuestion = 0;
        this.totalQuestions = 35;
        this.questionStartTime = Date.now();
        this.assessmentData = {
            technicalSkills: {},
            softSkills: {},
            personality: {},
            interests: {},
            values: {},
            responses: [],
            startTime: null,
            questionTimes: [],
            skillRatings: {}
        };
        
        // Enhanced data from JSON
        this.appData = {
            technicalSkills: [
                {
                    id: 1,
                    name: "Python Programming",
                    icon: "🐍",
                    description: "AI/ML, data science, backend development",
                    gradient: "linear-gradient(135deg, #3776ab 0%, #4b8bbe 100%)",
                    color: "#3776ab",
                    tags: ["AI/ML", "Backend", "Data Science"]
                },
                {
                    id: 2,
                    name: "JavaScript",
                    icon: "🟨",
                    description: "Web development, frontend applications",
                    gradient: "linear-gradient(135deg, #f7df1e 0%, #fae047 100%)",
                    color: "#f7df1e",
                    tags: ["Frontend", "Web Dev", "Full Stack"]
                },
                {
                    id: 3,
                    name: "Data Analysis",
                    icon: "📊",
                    description: "Excel, SQL, Python pandas, visualization",
                    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                    color: "#10b981",
                    tags: ["Analytics", "Visualization", "SQL"]
                },
                {
                    id: 4,
                    name: "Cloud Computing",
                    icon: "☁️",
                    description: "AWS, Azure, Google Cloud platforms",
                    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                    color: "#06b6d4",
                    tags: ["AWS", "DevOps", "Infrastructure"]
                }
            ],
            careerMatches: [
                {
                    id: 1,
                    title: "AI/Machine Learning Engineer",
                    icon: "🤖",
                    description: "Design intelligent systems that learn from data and solve complex problems",
                    matchPercentage: 95,
                    salaryRange: "₹8-45 LPA",
                    growthRate: 42,
                    marketDemand: "Very High",
                    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    category: "Technology"
                },
                {
                    id: 2,
                    title: "Full Stack Developer",
                    icon: "💻",
                    description: "Build complete web applications from frontend to backend",
                    matchPercentage: 88,
                    salaryRange: "₹4-25 LPA",
                    growthRate: 28,
                    marketDemand: "High",
                    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                    category: "Development"
                },
                {
                    id: 3,
                    title: "Data Scientist",
                    icon: "📊",
                    description: "Extract insights from data to drive business decisions",
                    matchPercentage: 85,
                    salaryRange: "₹6-35 LPA",
                    growthRate: 32,
                    marketDemand: "Very High",
                    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                    category: "Analytics"
                },
                {
                    id: 4,
                    title: "Product Manager",
                    icon: "🚀",
                    description: "Lead product strategy and coordinate cross-functional teams",
                    matchPercentage: 82,
                    salaryRange: "₹8-40 LPA",
                    growthRate: 22,
                    marketDemand: "High",
                    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                    category: "Strategy"
                },
                {
                    id: 5,
                    title: "UX/UI Designer",
                    icon: "🎨",
                    description: "Create beautiful and intuitive user experiences",
                    matchPercentage: 79,
                    salaryRange: "₹3.5-22 LPA",
                    growthRate: 25,
                    marketDemand: "High",
                    gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
                    category: "Design"
                }
            ],
            milestones: [
                { at: 8, title: "Technical Skills Mastered! 💻", effect: "confetti", color: "#6366f1", message: "Amazing progress! Your technical competencies have been thoroughly analyzed." },
                { at: 15, title: "Soft Skills Analyzed! 🤝", effect: "sparkles", color: "#8b5cf6", message: "Excellent! Your leadership and communication abilities are now mapped." },
                { at: 25, title: "Personality Profiled! 🧠", effect: "fireworks", color: "#d946ef", message: "Fantastic! We've unlocked your unique personality traits and cognitive patterns." },
                { at: 31, title: "Interests Discovered! ⭐", effect: "stars", color: "#06b6d4", message: "Outstanding! Your career interests and values have been perfectly identified." },
                { at: 35, title: "Assessment Complete! 🎉", effect: "grand_celebration", color: "#10b981", message: "Congratulations! Your personalized career recommendations are ready!" }
            ]
        };
        
        this.charts = {};
        this.feedbackSystem = new RealTimeFeedbackSystem();
        
        // Initialize the application
        this.init();
    }

    init() {
        console.log('🚀 Initializing Ultimate Career Advisor...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        console.log('🎯 Setting up premium application...');
        this.generateQuestions();
        this.setupTheme();
        this.initializeAnimations();
        
        // Delay event listeners to ensure DOM is ready
        setTimeout(() => {
            this.attachEventListeners();
        }, 100);
        
        this.showPage('landing');
        console.log('✨ Application setup complete - Ready for world-class experience!');
    }

    generateQuestions() {
        this.questions = [];
        
        // Technical Skills (8 questions)
        this.questions.push({
            id: 1,
            category: "Technical Skills",
            type: "skill_matrix",
            question: "Rate your proficiency in these programming languages:",
            skills: this.appData.technicalSkills.slice(0, 4)
        });
        
        for (let i = 2; i <= 8; i++) {
            this.questions.push({
                id: i,
                category: "Technical Skills",
                type: "skill_rating",
                question: `How would you rate your experience with ${['Web Development', 'Database Management', 'API Integration', 'Version Control', 'Testing & Debugging', 'DevOps & Deployment', 'Mobile Development'][i-2]}?`,
                scale: ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"]
            });
        }
        
        // Soft Skills (7 questions)
        for (let i = 9; i <= 15; i++) {
            this.questions.push({
                id: i,
                category: "Soft Skills",
                type: "scenario_cards",
                question: `How do you handle ${['team conflicts', 'tight deadlines', 'difficult clients', 'project changes', 'team leadership', 'public speaking', 'constructive criticism'][i-9]}?`,
                options: [
                    {
                        title: "Take Charge",
                        description: "Step up as leader and delegate tasks effectively",
                        icon: "👑",
                        gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                        features: ["Leadership", "Decision Making"],
                        feedback: "Shows natural leadership abilities!"
                    },
                    {
                        title: "Collaborate",
                        description: "Bring team together for brainstorming session",
                        icon: "🤝",
                        gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                        features: ["Teamwork", "Communication"],
                        feedback: "Great collaborative approach!"
                    },
                    {
                        title: "Analyze",
                        description: "Research root causes and create action plan",
                        icon: "🔍",
                        gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                        features: ["Problem Solving", "Analysis"],
                        feedback: "Excellent analytical thinking!"
                    },
                    {
                        title: "Support",
                        description: "Offer help and resources to struggling teammates",
                        icon: "🤲",
                        gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                        features: ["Empathy", "Support"],
                        feedback: "Shows strong emotional intelligence!"
                    }
                ]
            });
        }
        
        // Personality (10 questions)
        for (let i = 16; i <= 25; i++) {
            this.questions.push({
                id: i,
                category: "Personality",
                type: "emoji_scale",
                question: [
                    "How do you feel about being the center of attention?",
                    "Do you prefer working with details or big picture ideas?",
                    "How do you handle stress and pressure?",
                    "Are you more of a planner or spontaneous person?",
                    "How do you prefer to learn new things?",
                    "What motivates you most in work?",
                    "How do you handle feedback and criticism?",
                    "Do you prefer working alone or in teams?",
                    "How do you approach decision making?",
                    "What's your ideal work pace?"
                ][i-16],
                leftLabel: ["Prefer background", "Details focused", "Get stressed easily", "Prefer planning", "Learn by doing", "Money motivated", "Take it personally", "Work alone", "Quick decisions", "Steady pace"][i-16],
                rightLabel: ["Love spotlight", "Big picture", "Thrive under pressure", "Go with flow", "Learn by reading", "Impact motivated", "Use it to improve", "Team player", "Careful analysis", "Fast pace"][i-16],
                emojis: ["😴", "😌", "🙂", "😊", "🤩"],
                gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
            });
        }
        
        // Career Interests (6 questions)
        this.questions.push({
            id: 26,
            category: "Career Interests",
            type: "environment_selector",
            question: "Which work environment energizes you most?",
            environments: [
                { id: "startup", title: "High-Energy Startup", icon: "🚀", description: "Fast-paced innovation", gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" },
                { id: "corporate", title: "Established Corporation", icon: "🏢", description: "Structured processes", gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" },
                { id: "remote", title: "Remote Work", icon: "🏠", description: "Location independence", gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)" },
                { id: "consulting", title: "Consulting", icon: "💼", description: "Varied projects", gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }
            ]
        });
        
        for (let i = 27; i <= 31; i++) {
            this.questions.push({
                id: i,
                category: "Career Interests",
                type: "importance_rating",
                question: `How important is ${['High Salary & Benefits', 'Work-Life Balance', 'Career Growth Opportunities', 'Creative Freedom', 'Social Impact'][i-27]} to you?`,
                scale: ["Not Important", "Slightly Important", "Moderately Important", "Very Important", "Extremely Important"]
            });
        }
        
        // Values Assessment (4 questions)
        for (let i = 32; i <= 35; i++) {
            this.questions.push({
                id: i,
                category: "Values Assessment",
                type: "importance_rating",
                question: `How important is ${['Innovation & Creativity', 'Team Collaboration', 'Leadership Opportunities', 'Making a Difference'][i-32]} in your ideal career?`,
                scale: ["Not Important", "Slightly Important", "Moderately Important", "Very Important", "Extremely Important"]
            });
        }
        
        console.log(`✨ Generated ${this.questions.length} premium interactive questions`);
    }

    attachEventListeners() {
        console.log('🎯 Attaching premium event listeners...');
        
        // Use direct event binding for better reliability
        const startBtn = document.getElementById('startAssessment');
        if (startBtn) {
            startBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Start Assessment clicked');
                this.triggerButtonEffect(startBtn);
                // Show user info modal
                document.getElementById('userInfoModal').classList.remove('hidden');
                document.body.classList.add('modal-open');
            };
        // User Info Modal logic
        const userInfoModal = document.getElementById('userInfoModal');
        const userInfoForm = document.getElementById('userInfoForm');
        const cancelUserInfo = document.getElementById('cancelUserInfo');
        if (cancelUserInfo) {
            cancelUserInfo.onclick = () => {
                userInfoModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            };
        }
        if (userInfoForm) {
            userInfoForm.onsubmit = (e) => {
                e.preventDefault();
                // Validate and collect data
                const name = document.getElementById('userName').value.trim();
                const age = document.getElementById('userAge').value.trim();
                const qualification = document.getElementById('userQualification').value.trim();
                const email = document.getElementById('userEmail').value.trim();
                if (!name || !age || !qualification || !email) {
                    alert('Please fill in all fields.');
                    return;
                }
                // Store user info (could be in localStorage or app state)
                window.userInfo = { name, age, qualification, email };
                userInfoModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
                // Always use app.showIntro to ensure intro page is fully rendered
                if (typeof app !== 'undefined' && app.showIntro) {
                    app.showIntro();
                }
            };
        }
        }
        
        const beginBtn = document.getElementById('beginAssessment');
        if (beginBtn) {
            beginBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Begin Assessment clicked');
                this.triggerButtonEffect(beginBtn);
                this.startAssessment();
            };
        }
        
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                this.triggerButtonEffect(nextBtn);
                this.nextQuestion();
            };
        }
        
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                this.triggerButtonEffect(prevBtn);
                this.prevQuestion();
            };
        }
        
        const exploreBtn = document.getElementById('exploreMoreBtn');
        if (exploreBtn) {
            exploreBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Explore more clicked');
                this.triggerButtonEffect(exploreBtn);
                this.showDashboard();
            };
        }
        
        const retakeBtn = document.getElementById('retakeBtn');
        if (retakeBtn) {
            retakeBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Retake clicked');
                this.triggerButtonEffect(retakeBtn);
                this.resetAssessment();
            };
        }
        
        // Preview button
        const previewBtn = document.querySelector('.preview-btn');
        if (previewBtn) {
            previewBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Preview button clicked');
                this.triggerButtonEffect(previewBtn);
                this.showIntro();
            };
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.onclick = (e) => {
                e.preventDefault();
                console.log('Theme toggle clicked');
                this.triggerButtonEffect(themeToggle);
                this.toggleTheme();
            };
        }
        
        // Modal controls
        const continueMilestone = document.getElementById('continueMilestone');
        if (continueMilestone) {
            continueMilestone.onclick = (e) => {
                e.preventDefault();
                this.closeMilestone();
            };
        }
        
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.onclick = (e) => {
                e.preventDefault();
                this.showExportModal();
            };
        }
        
        const cancelExport = document.getElementById('cancelExport');
        if (cancelExport) {
            cancelExport.onclick = (e) => {
                e.preventDefault();
                this.hideExportModal();
            };
        }
        
        // Export options
        document.querySelectorAll('.export-option').forEach(option => {
            option.onclick = () => {
                this.triggerCardEffect(option);
                setTimeout(() => {
                    this.exportResults(option.dataset.format);
                }, 200);
            };
        });
        
        // Close modals on backdrop click
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.onclick = () => {
                this.closeModals();
            };
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'assessment') {
                if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) {
                    this.nextQuestion();
                } else if (e.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) {
                    this.prevQuestion();
                }
            }
        });
        
        console.log('✅ Premium event listeners attached successfully');
    }

    triggerButtonEffect(element) {
        const btn = typeof element === 'string' ? document.getElementById(element) : element;
        if (btn) {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        }
    }

    triggerCardEffect(element) {
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }

    initializeAnimations() {
        // Initialize floating stats animation
        const statsCards = document.querySelectorAll('.stat-card');
        statsCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Initialize preview sections animation
        const previewSections = document.querySelectorAll('.preview-section');
        previewSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
    }

    showPage(pageId) {
        console.log(`🎨 Showing premium page: ${pageId}`);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            setTimeout(() => {
                targetPage.classList.add('active');
                this.currentPage = pageId;
                
                // Page-specific setup
                if (pageId === 'results') {
                    setTimeout(() => this.displayResults(), 300);
                } else if (pageId === 'dashboard') {
                    setTimeout(() => this.initializeDashboard(), 300);
                } else if (pageId === 'intro') {
                    setTimeout(() => this.animatePreviewSections(), 500);
                }
            }, 100);
            
            console.log(`✨ Page ${pageId} is now active`);
        } else {
            console.error(`❌ Page not found: ${pageId}`);
        }
    }

    showIntro() {
        console.log('🎯 Showing premium intro experience');
        this.showPage('intro');
    }

    animatePreviewSections() {
        const sections = document.querySelectorAll('.preview-section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Animate progress bars
                const progressFill = section.querySelector('.progress-fill');
                if (progressFill) {
                    setTimeout(() => {
                        progressFill.style.width = `${Math.random() * 30 + 10}%`;
                    }, 200);
                }
            }, index * 150);
        });
    }

    startAssessment() {
        console.log('🚀 Starting premium assessment experience');
        this.assessmentData.startTime = Date.now();
        this.currentQuestion = 0;
        this.questionStartTime = Date.now();
        this.showPage('assessment');
        
        setTimeout(() => {
            this.displayQuestion();
        }, 300);
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        if (!question) {
            console.log('🎉 Assessment completed - launching AI processing');
            this.completeAssessment();
            return;
        }

        console.log(`🎯 Displaying premium question ${this.currentQuestion + 1}: ${question.question}`);

        // Update progress with animations
        this.updateProgress();
        
        // Get elements
        const questionCard = document.getElementById('questionCard');
        const questionBody = document.getElementById('questionBody');
        
        if (!questionCard || !questionBody) {
            console.error('❌ Question elements not found');
            return;
        }
        
        // Animate out
        questionCard.style.opacity = '0.7';
        questionCard.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Update header
            const categoryEl = questionCard.querySelector('.question-category');
            const typeEl = questionCard.querySelector('.question-type');
            const titleEl = questionCard.querySelector('.question-title');
            if (categoryEl) categoryEl.textContent = question.category;
            if (typeEl) typeEl.textContent = this.formatQuestionType(question.type);
            if (titleEl) titleEl.textContent = question.question;
            // Generate premium question content
            questionBody.innerHTML = this.generateQuestionContent(question);
            // Update navigation
            this.updateNavigationButtons();
            // Animate in
            questionCard.style.opacity = '1';
            questionCard.style.transform = 'translateY(0)';
            // Show real-time feedback
            this.showQuestionFeedback(question);

            // Scroll question card into view for mobile usability
            setTimeout(() => {
                questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }, 200);
    }

    generateQuestionContent(question) {
        switch (question.type) {
            case 'skill_matrix':
                return this.generateSkillMatrix(question);
            case 'skill_rating':
                return this.generateSkillRating(question);
            case 'scenario_cards':
                return this.generateScenarioCards(question);
            case 'emoji_scale':
                return this.generateEmojiScale(question);
            case 'environment_selector':
                return this.generateEnvironmentSelector(question);
            case 'importance_rating':
                return this.generateSkillRating(question);
            default:
                return this.generateSkillRating(question);
        }
    }

    generateSkillMatrix(question) {
        let html = '<div class="skill-matrix">';
        
        question.skills.forEach((skill, index) => {
            html += `
                <div class="skill-item" style="animation-delay: ${index * 0.1}s">
                    <div class="skill-icon-wrapper" style="background: ${skill.gradient}">
                        <span class="skill-icon">${skill.icon}</span>
                    </div>
                    <div class="skill-info">
                        <h4>${skill.name}</h4>
                        <p>${skill.description}</p>
                        <div class="skill-tags">
                            ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skill-slider-container">
                        <input type="range" 
                               class="skill-slider" 
                               min="0" 
                               max="4" 
                               value="0"
                               data-skill="${skill.name}"
                               id="skill-${index}"
                               style="--slider-color: ${skill.color}">
                        <div class="slider-labels">
                            ${['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'].map((label, i) => `
                                <span class="slider-label ${i === 0 ? 'active' : ''}" data-value="${i}">${label}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Enhanced event listeners with real-time feedback
        setTimeout(() => {
            document.querySelectorAll('.skill-slider').forEach(slider => {
                slider.oninput = (e) => {
                    this.updateSliderLabels(e.target);
                    this.saveSkillRating(e.target.dataset.skill, parseInt(e.target.value));
                    this.checkQuestionCompletion();
                    
                    // Show real-time feedback
                    const skillName = e.target.dataset.skill;
                    const level = parseInt(e.target.value);
                    const levelNames = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
                    this.feedbackSystem.showInstantFeedback('technical', 
                        `${skillName}: ${levelNames[level]} level selected`, level * 25);
                };
            });
        }, 100);
        
        return html;
    }

    generateSkillRating(question) {
        let html = '<div class="rating-scale">';
        
        question.scale.forEach((option, index) => {
            html += `
                <label class="rating-option" style="animation-delay: ${index * 0.05}s">
                    <input type="radio" name="rating-${this.currentQuestion}" value="${index}">
                    <span class="rating-label">${option}</span>
                    <div class="rating-indicator">
                        ${Array(5).fill(0).map((_, i) => `
                            <div class="rating-dot ${i <= index ? 'active' : ''}"></div>
                        `).join('')}
                    </div>
                </label>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll(`input[name="rating-${this.currentQuestion}"]`).forEach(input => {
                input.onchange = () => {
                    this.saveResponse(this.currentQuestion, parseInt(input.value));
                    this.checkQuestionCompletion();
                    
                    // Enhanced visual feedback
                    const parent = input.closest('.rating-option');
                    parent.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        parent.style.transform = '';
                    }, 200);
                    
                    // Show real-time feedback
                    this.feedbackSystem.showInstantFeedback('skill', 
                        `Selected: ${question.scale[parseInt(input.value)]}`, (parseInt(input.value) + 1) * 20);
                };
            });
        }, 100);
        
        return html;
    }

    generateScenarioCards(question) {
        let html = '<div class="scenario-grid">';
        
        question.options.forEach((option, index) => {
            html += `
                <div class="scenario-card" data-index="${index}" style="animation-delay: ${index * 0.1}s">
                    <div class="card-background" style="background: ${option.gradient}"></div>
                    <div class="card-content">
                        <div class="scenario-icon">${option.icon}</div>
                        <h4>${option.title}</h4>
                        <p>${option.description}</p>
                        <div class="scenario-features">
                            ${option.features.map(feature => `
                                <span class="feature-badge">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.scenario-card').forEach(card => {
                card.onclick = () => {
                    // Remove previous selections
                    document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('selected'));
                    
                    // Add selection with premium animation
                    card.classList.add('selected');
                    card.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 300);
                    
                    const index = parseInt(card.dataset.index);
                    this.saveResponse(this.currentQuestion, index);
                    this.checkQuestionCompletion();
                    
                    // Show personalized feedback
                    const selectedOption = question.options[index];
                    this.feedbackSystem.showInstantFeedback('personality', selectedOption.feedback);
                    
                    // Trigger confetti for great choices
                    if (typeof confetti !== 'undefined') {
                        confetti({
                            particleCount: 30,
                            spread: 50,
                            origin: { x: 0.5, y: 0.7 }
                        });
                    }
                };
            });
        }, 100);
        
        return html;
    }

    generateEmojiScale(question) {
        let html = `
            <div class="emoji-scale-container">
                <div class="emoji-scale">
                    <div class="scale-labels">
                        <span class="left-label">${question.leftLabel}</span>
                        <span class="right-label">${question.rightLabel}</span>
                    </div>
                    <div class="emoji-options">
                        ${question.emojis.map((emoji, index) => `
                            <button class="emoji-option" data-value="${index}" style="animation-delay: ${index * 0.1}s">
                                <span class="emoji">${emoji}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            document.querySelectorAll('.emoji-option').forEach(button => {
                button.onclick = () => {
                    // Remove previous selections
                    document.querySelectorAll('.emoji-option').forEach(b => b.classList.remove('selected'));
                    
                    // Add selection with animation
                    button.classList.add('selected');
                    button.style.transform = 'scale(1.3) rotate(15deg)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1.1)';
                    }, 200);
                    
                    const value = parseInt(button.dataset.value);
                    this.saveResponse(this.currentQuestion, value);
                    this.checkQuestionCompletion();
                    
                    // Show personality insight
                    const intensity = ['Low', 'Below Average', 'Moderate', 'High', 'Very High'][value];
                    this.feedbackSystem.showInstantFeedback('personality', 
                        `Personality trait intensity: ${intensity}`, (value + 1) * 20);
                };
            });
        }, 100);
        
        return html;
    }

    generateEnvironmentSelector(question) {
        let html = '<div class="environment-grid">';
        
        question.environments.forEach((env, index) => {
            html += `
                <div class="environment-card" data-value="${index}" data-id="${env.id}" 
                     style="animation-delay: ${index * 0.1}s">
                    <div class="env-background" style="background: ${env.gradient}"></div>
                    <div class="env-content">
                        <div class="env-icon">${env.icon}</div>
                        <h4>${env.title}</h4>
                        <p>${env.description}</p>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        setTimeout(() => {
            document.querySelectorAll('.environment-card').forEach(card => {
                card.onclick = () => {
                    // Remove previous selections
                    document.querySelectorAll('.environment-card').forEach(c => c.classList.remove('selected'));
                    
                    // Add selection with premium animation
                    card.classList.add('selected');
                    card.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 400);
                    
                    const value = parseInt(card.dataset.value);
                    this.saveResponse(this.currentQuestion, value);
                    this.checkQuestionCompletion();
                    
                    // Show environment feedback
                    const selectedEnv = question.environments[value];
                    this.feedbackSystem.showInstantFeedback('achievement', 
                        `Perfect choice! ${selectedEnv.title} aligns well with your profile.`);
                    
                    // Trigger celebration effect
                    if (typeof confetti !== 'undefined') {
                        confetti({
                            particleCount: 50,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#6366f1', '#8b5cf6', '#d946ef']
                        });
                    }
                };
            });
        }, 100);
        
        return html;
    }

    updateSliderLabels(slider) {
        const labels = slider.parentElement.querySelectorAll('.slider-label');
        const value = parseInt(slider.value);
        
        labels.forEach((label, index) => {
            label.classList.toggle('active', index === value);
        });
        
        // Update slider track color
        const percentage = (value / 4) * 100;
        slider.style.background = `linear-gradient(to right, ${slider.style.getPropertyValue('--slider-color') || '#a78bfa'} 0%, ${slider.style.getPropertyValue('--slider-color') || '#a78bfa'} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`;
    }

    saveSkillRating(skillName, value) {
        if (!this.assessmentData.skillRatings) {
            this.assessmentData.skillRatings = {};
        }
        this.assessmentData.skillRatings[skillName] = value;
        
        // Update technical skills data
        if (!this.assessmentData.technicalSkills) {
            this.assessmentData.technicalSkills = {};
        }
        this.assessmentData.technicalSkills[skillName] = value;
    }

    saveResponse(questionId, value) {
        this.assessmentData.responses[questionId] = value;
        
        // Categorize response
        const question = this.questions[questionId];
        if (question) {
            switch (question.category) {
                case "Soft Skills":
                    if (!this.assessmentData.softSkills) this.assessmentData.softSkills = {};
                    this.assessmentData.softSkills[`question_${questionId}`] = value;
                    break;
                case "Personality":
                    if (!this.assessmentData.personality) this.assessmentData.personality = {};
                    this.assessmentData.personality[`trait_${questionId}`] = value;
                    break;
                case "Career Interests":
                    if (!this.assessmentData.interests) this.assessmentData.interests = {};
                    this.assessmentData.interests[`interest_${questionId}`] = value;
                    break;
                case "Values Assessment":
                    if (!this.assessmentData.values) this.assessmentData.values = {};
                    this.assessmentData.values[`value_${questionId}`] = value;
                    break;
            }
        }
    }

    formatQuestionType(type) {
        const typeMap = {
            'skill_matrix': 'Interactive Skills Matrix',
            'skill_rating': 'Skill Proficiency Scale',
            'scenario_cards': 'Scenario Selection Cards',
            'emoji_scale': 'Emoji Personality Scale',
            'environment_selector': '3D Environment Selector',
            'importance_rating': 'Importance Rating Scale'
        };
        return typeMap[type] || 'Premium Assessment';
    }

    updateProgress() {
        const progressPercent = ((this.currentQuestion + 1) / this.totalQuestions * 100).toFixed(1);
        const progressWidth = (this.currentQuestion + 1) / this.totalQuestions * 100;
        
        // Update progress elements with animations
        const currentQuestionEl = document.querySelector('.current-question');
        const totalQuestionsEl = document.querySelector('.total-questions');
        const progressPercentEl = document.querySelector('.progress-percentage');
        const progressFillEl = document.querySelector('.progress-fill-main');
        
        if (currentQuestionEl) {
            currentQuestionEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                currentQuestionEl.textContent = this.currentQuestion + 1;
                currentQuestionEl.style.transform = '';
            }, 100);
        }
        
        if (totalQuestionsEl) totalQuestionsEl.textContent = this.totalQuestions;
        if (progressPercentEl) {
            progressPercentEl.textContent = `${progressPercent}%`;
            progressPercentEl.style.color = progressWidth > 50 ? '#10b981' : '#a78bfa';
        }
        
        if (progressFillEl) {
            progressFillEl.style.width = `${progressWidth}%`;
        }
        
        // Update section progress
        const question = this.questions[this.currentQuestion];
        if (question) {
            const sectionQuestions = this.questions.filter(q => q.category === question.category);
            const sectionIndex = sectionQuestions.findIndex(q => q.id === question.id) + 1;
            
            const currentSectionEl = document.querySelector('.current-section');
            const sectionProgressEl = document.querySelector('.section-progress');
            
            if (currentSectionEl) currentSectionEl.textContent = question.category;
            if (sectionProgressEl) {
                sectionProgressEl.textContent = `Question ${sectionIndex} of ${sectionQuestions.length}`;
            }
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
            prevBtn.style.opacity = this.currentQuestion === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            const isAnswered = this.isQuestionAnswered();
            nextBtn.disabled = !isAnswered;
            nextBtn.style.opacity = isAnswered ? '1' : '0.5';
            
            if (this.currentQuestion === this.totalQuestions - 1) {
                nextBtn.innerHTML = `
                    <span class="btn-text">Complete Assessment</span>
                    <span class="btn-icon">✓</span>
                    <div class="btn-ripple"></div>
                `;
            } else {
                nextBtn.innerHTML = `
                    <span class="btn-text">Next Question</span>
                    <span class="btn-icon">→</span>
                    <div class="btn-ripple"></div>
                `;
            }
        }
    }

    isQuestionAnswered() {
        const questionBody = document.getElementById('questionBody');
        if (!questionBody) return false;
        
        // Check for radio buttons
        const checkedRadio = questionBody.querySelector('input[type="radio"]:checked');
        if (checkedRadio) return true;
        
        // Check for sliders moved from default
        const sliders = questionBody.querySelectorAll('input[type="range"]');
        for (let slider of sliders) {
            if (parseInt(slider.value) > 0) return true;
        }
        
        // Check for selected cards
        const selectedCard = questionBody.querySelector('.scenario-card.selected, .environment-card.selected, .emoji-option.selected');
        if (selectedCard) return true;
        
        return false;
    }

    checkQuestionCompletion() {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            const isAnswered = this.isQuestionAnswered();
            nextBtn.disabled = !isAnswered;
            nextBtn.style.opacity = isAnswered ? '1' : '0.5';
            
            if (isAnswered) {
                nextBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    nextBtn.style.transform = '';
                }, 200);
            }
        }
    }

    showQuestionFeedback(question) {
        // Show contextual tips based on question type
        const feedbackMessages = {
            'skill_matrix': 'Be honest about your current skill level - this helps us recommend the perfect learning path!',
            'scenario_cards': 'Choose the approach that feels most natural to you - there are no wrong answers!',
            'emoji_scale': 'Your personality traits help us find careers where you\'ll truly thrive!',
            'environment_selector': 'Think about where you feel most energized and productive!',
            'importance_rating': 'Your priorities help us match you with meaningful work opportunities!'
        };
        
        const message = feedbackMessages[question.type];
        if (message) {
            setTimeout(() => {
                this.feedbackSystem.showInstantFeedback('info', message);
            }, 1000);
        }
    }

    nextQuestion() {
        console.log(`➡️ Moving to next question. Current: ${this.currentQuestion + 1}`);
        
        // Save timing data
        this.assessmentData.questionTimes.push({
            questionId: this.questions[this.currentQuestion].id,
            timeSpent: Date.now() - this.questionStartTime,
            category: this.questions[this.currentQuestion].category
        });
        
        // Check for milestones before moving
        this.checkMilestones();
        
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.questionStartTime = Date.now();
            
            // Add transition animation
            const questionCard = document.getElementById('questionCard');
            if (questionCard) {
                questionCard.style.transform = 'translateX(-20px)';
                questionCard.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.displayQuestion();
                }, 200);
            } else {
                this.displayQuestion();
            }
        } else {
            this.completeAssessment();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            console.log(`⬅️ Moving to previous question. Current: ${this.currentQuestion + 1}`);
            
            this.currentQuestion--;
            this.questionStartTime = Date.now();
            
            // Add transition animation
            const questionCard = document.getElementById('questionCard');
            if (questionCard) {
                questionCard.style.transform = 'translateX(20px)';
                questionCard.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.displayQuestion();
                }, 200);
            } else {
                this.displayQuestion();
            }
        }
    }

    checkMilestones() {
        const milestone = this.appData.milestones.find(m => m.at === this.currentQuestion + 1);
        if (milestone) {
            console.log(`🎉 Milestone reached: ${milestone.title}`);
            setTimeout(() => {
                this.showMilestone(milestone);
            }, 500);
        }
    }

    showMilestone(milestone) {
        const modal = document.getElementById('milestoneModal');
        const icon = document.getElementById('milestoneIcon');
        const title = document.getElementById('milestoneTitle');
        const message = document.getElementById('milestoneMessage');
        
        if (icon) icon.textContent = this.getMilestoneIcon(milestone.effect);
        if (title) title.textContent = milestone.title;
        if (message) message.textContent = milestone.message;
        
        if (modal) {
            modal.classList.remove('hidden');
            
            // Trigger celebration effect
            this.triggerCelebrationEffect(milestone.effect);
            
            // Auto-close after 3 seconds
            setTimeout(() => {
                if (!modal.classList.contains('hidden')) {
                    this.closeMilestone();
                }
            }, 3000);
        }
    }

    getMilestoneIcon(effect) {
        const icons = {
            confetti: '🎊',
            sparkles: '✨',
            fireworks: '🎆',
            stars: '⭐',
            grand_celebration: '🎉'
        };
        return icons[effect] || '🎉';
    }

    triggerCelebrationEffect(effect) {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#8b5cf6', '#d946ef']
            });
        }
    }

    closeMilestone() {
        const modal = document.getElementById('milestoneModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    completeAssessment() {
        console.log('🎯 Assessment completed - launching premium AI processing');
        this.assessmentData.endTime = Date.now();
        this.assessmentData.totalTime = this.assessmentData.endTime - this.assessmentData.startTime;
        
        this.showProcessing();
    }

    showProcessing() {
        this.showPage('processing');
        setTimeout(() => {
            this.simulateAIProcessing();
        }, 500);
    }

    simulateAIProcessing() {
        let progress = 0;
        const progressCircle = document.getElementById('progressCircle');
        const progressText = document.querySelector('.progress-percent');
        const processingText = document.getElementById('processingText');

        const steps = [
            'Analyzing technical competencies with ML algorithms...',
            'Evaluating soft skills and leadership potential...',
            'Mapping personality traits and cognitive patterns...',
            'Processing career interests and value alignment...',
            'Generating personalized recommendations with AI...'
        ];

        let stepIndex = 0;
        let geminiDone = false;

    // Record the start time for Gemini analysis
    const geminiStartTime = Date.now();

        // Start Gemini analysis in parallel

        // Add fallback timeout to avoid stuck at 99%
        const geminiPromise = new Promise((resolve) => {
            let finished = false;
            this._geminiAnalysisCallback = () => {
                if (!finished) {
                    geminiDone = true;
                    finished = true;
                    // Calculate elapsed time
                    const elapsed = Date.now() - geminiStartTime;
                    // Animate progress to 100% over the same duration
                    const animateTo100 = () => {
                        if (progress < 100) {
                            progress += 2;
                            if (progress > 100) progress = 100;
                            if (progressCircle) {
                                const circumference = 2 * Math.PI * 54;
                                const offset = circumference - (progress / 100 * circumference);
                                progressCircle.style.strokeDashoffset = offset;
                            }
                            if (progressText) {
                                progressText.textContent = `${Math.round(progress)}%`;
                            }
                            setTimeout(animateTo100, Math.max(10, elapsed / 50));
                        } else {
                            resolve();
                        }
                    };
                    animateTo100();
                }
            };
            // Fallback: if Gemini doesn't finish in 15s, resolve anyway and show error
            const geminiTimeout = setTimeout(() => {
                if (!finished) {
                    geminiDone = true;
                    finished = true;
                    progress = 100;
                    if (progressCircle) {
                        const circumference = 2 * Math.PI * 54;
                        const offset = circumference - (progress / 100 * circumference);
                        progressCircle.style.strokeDashoffset = offset;
                    }
                    if (progressText) {
                        progressText.textContent = `${Math.round(progress)}%`;
                    }
                    resolve();
                    alert('Gemini AI took too long to respond. Please try again later or check your network.');
                }
            }, 300000);

            // Clear timeout if Gemini finishes in time
            this._geminiAnalysisCallback = () => {
                if (!finished) {
                    geminiDone = true;
                    finished = true;
                    clearTimeout(geminiTimeout);
                    // Calculate elapsed time
                    const elapsed = Date.now() - geminiStartTime;
                    // Animate progress to 100% over the same duration
                    const animateTo100 = () => {
                        if (progress < 100) {
                            progress += 2;
                            if (progress > 100) progress = 100;
                            if (progressCircle) {
                                const circumference = 2 * Math.PI * 54;
                                const offset = circumference - (progress / 100 * circumference);
                                progressCircle.style.strokeDashoffset = offset;
                            }
                            if (progressText) {
                                progressText.textContent = `${Math.round(progress)}%`;
                            }
                            setTimeout(animateTo100, Math.max(10, elapsed / 50));
                        } else {
                            resolve();
                        }
                    };
                    animateTo100();
                }
            };
        });
        this.generateResults(() => {
            if (this._geminiAnalysisCallback) this._geminiAnalysisCallback();
        });

        const updateProgress = () => {
            // Animate progress only if Gemini is not done
            if (!geminiDone) {
                progress += Math.random() * 3 + 1;
                if (progress > 99) progress = 99;
            }

            if (progressCircle) {
                const circumference = 2 * Math.PI * 54;
                const offset = circumference - (progress / 100 * circumference);
                progressCircle.style.strokeDashoffset = offset;
            }

            if (progressText) {
                progressText.textContent = `${Math.round(progress)}%`;
            }

            // Update processing steps
            if (progress > stepIndex * 20 && stepIndex < steps.length) {
                if (processingText) {
                    processingText.style.opacity = '0.5';
                    setTimeout(() => {
                        processingText.textContent = steps[stepIndex];
                        processingText.style.opacity = '1';
                    }, 200);
                }

                // Activate step visual
                const stepEl = document.getElementById(`step${stepIndex + 1}`);
                if (stepEl) {
                    stepEl.classList.add('active');

                    // Deactivate previous step
                    if (stepIndex > 0) {
                        const prevStepEl = document.getElementById(`step${stepIndex}`);
                        if (prevStepEl) prevStepEl.classList.remove('active');
                    }
                }

                stepIndex++;
            }

            if (progress < 100 || !geminiDone) {
                setTimeout(updateProgress, 100 + Math.random() * 200);
            } else {
                // Finalize processing
                setTimeout(() => {
                    this.showPage('results');
                    // Trigger final celebration
                    if (typeof confetti !== 'undefined') {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            origin: { y: 0.6 },
                            colors: ['#6366f1', '#8b5cf6', '#d946ef', '#10b981']
                        });
                    }
                }, 1000);
            }
        };

        updateProgress();
    }

    generateResults() {
        console.log('📊 Generating premium career recommendations using Gemini AI');
        this.careerMatches = [];
        const assessmentData = this.assessmentData;
        // Add user info to assessmentData for Gemini
        if (window.userInfo) {
            assessmentData.userName = window.userInfo.name;
            assessmentData.userAge = window.userInfo.age;
            assessmentData.userQualification = window.userInfo.qualification;
            assessmentData.userEmail = window.userInfo.email;
        }
        const prompt = `You are a career advisor AI. Based on the following assessment data, analyze the user's skills, soft skills, personality, interests, values, age, and qualification, and recommend the top 5 best-fit job roles. For each job, provide:\n- Title\n- Short description\n- Estimated match percentage (60-99)\n- Salary range (in INR LPA)\n- Growth rate (%)\n- Market demand (Low/Medium/High/Very High)\n- Category\n- An emoji icon\n- A color gradient for the card\n\nAssessment Data (JSON):\n${JSON.stringify(assessmentData, null, 2)}\n\nRespond in JSON array format as shown:\n[\n  {\n    "title": "Job Title",\n    "icon": "🧑‍💻",\n    "description": "...",\n    "matchPercentage": 95,\n    "salaryRange": "₹8-45 LPA",\n    "growthRate": 42,\n    "marketDemand": "Very High",\n    "gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",\n    "category": "Technology"\n  }, ...\n]`;
        const self = this;
        window.callGemini(prompt, assessmentData).then(result => {
            try {
                let clean = result.trim();
                if (clean.startsWith('<!DOCTYPE')) {
                    throw new Error('Gemini endpoint returned HTML, not JSON. Check your API/proxy URL.');
                }
                if (clean.startsWith('```json')) clean = clean.slice(7);
                if (clean.startsWith('json')) clean = clean.slice(4);
                clean = clean.replace(/^`+|`+$/g, '').trim();
                let jobs = JSON.parse(clean);
                if (Array.isArray(jobs)) {
                    // Ensure each job has a unique id
                    jobs = jobs.map((job, idx) => ({ id: job.id || `gemini-${idx+1}`, ...job }));
                    self.careerMatches = jobs;
                    console.log('\u2728 Gemini AI career matches:', jobs);
                    // Ensure results page is visible
                    if (typeof self.showPage === 'function') self.showPage('results');
                } else {
                    throw new Error('Gemini did not return an array');
                }
            } catch (e) {
                console.error('Failed to parse Gemini job recommendations:', e, result);
                self.careerMatches = [];
            }
            self.displayResults();
            if (typeof self._geminiAnalysisCallback === 'function') self._geminiAnalysisCallback();
        }).catch(err => {
            console.error('Gemini API error:', err);
            self.careerMatches = [];
            self.displayResults();
            if (typeof self._geminiAnalysisCallback === 'function') self._geminiAnalysisCallback();
        });
    }

    displayResults() {
        const matchesGrid = document.getElementById('matchesGrid');
        if (!matchesGrid) return;
        
        console.log('🎨 Displaying premium career matches');
        matchesGrid.innerHTML = '';
        
        this.careerMatches.forEach((career, index) => {
            const card = document.createElement('div');
            card.className = 'career-match-card glass-card';
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Calculate match circle gradient
            const matchColor = career.matchPercentage > 90 ? '#10b981' : 
                             career.matchPercentage > 80 ? '#6366f1' : '#f59e0b';
            
            card.innerHTML = `
                <div class="match-header">
                    <div class="career-info">
                        <div class="career-icon">${career.icon}</div>
                        <h3>${career.title}</h3>
                        <p>${career.description}</p>
                    </div>
                    <div class="match-percentage">
                        <div class="match-circle" style="background: conic-gradient(${matchColor} ${career.matchPercentage * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)">
                            ${career.matchPercentage}%
                        </div>
                        <div class="match-label">AI Match</div>
                    </div>
                </div>
                
                <div class="career-stats">
                    <div class="stat">
                        <div class="stat-icon">💰</div>
                        <div class="stat-info">
                            <div class="stat-label">Salary Range</div>
                            <div class="stat-value">${career.salaryRange}</div>
                        </div>
                    </div>
                    <div class="stat">
                        <div class="stat-icon">📈</div>
                        <div class="stat-info">
                            <div class="stat-label">Growth Rate</div>
                            <div class="stat-value success">+${career.growthRate}%</div>
                        </div>
                    </div>
                    <div class="stat">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-info">
                            <div class="stat-label">Market Demand</div>
                            <div class="stat-value">${career.marketDemand}</div>
                        </div>
                    </div>
                </div>
                
                <div class="career-category">
                    <span class="category-badge" style="background: ${career.gradient}">${career.category}</span>
                </div>
            `;
            
            // Add click interaction
            card.onclick = () => {
                this.exploreCareer(career.id);
            };
            
            matchesGrid.appendChild(card);
        });
        
        // Animate cards in sequence
        setTimeout(() => {
            const cards = matchesGrid.querySelectorAll('.career-match-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
            });
        }, 300);
    }

    exploreCareer(careerId) {
        const career = this.careerMatches.find(c => c.id === careerId);
        if (career) {
            this.feedbackSystem.showInstantFeedback('achievement', 
                `Exploring ${career.title}! This career path offers excellent opportunities for your profile.`);
            
            console.log(`🚀 Exploring career: ${career.title}`);
        }
    }

    showDashboard() {
        console.log('📊 Launching premium analytics dashboard');
        this.showPage('dashboard');
    }

    initializeDashboard() {
        setTimeout(() => {
            this.createCharts();
            this.generateLearningPath();
        }, 500);
    }

    createCharts() {
        console.log('📊 Creating premium analytics charts (Gemini-powered)');
        if (typeof Chart === 'undefined') {
            console.warn('⚠️ Chart.js not loaded');
            return;
        }
        // Skills Radar Chart (from assessmentData.skillsScores or fallback)
        const skillsCtx = document.getElementById('skillsChart');
        let skillLabels = ['Python', 'JavaScript', 'Communication', 'Leadership', 'Problem Solving', 'Creativity'];
        let skillData = [85, 75, 90, 70, 88, 82];
        if (this.assessmentData && this.assessmentData.skillsScores) {
            skillLabels = Object.keys(this.assessmentData.skillsScores);
            skillData = Object.values(this.assessmentData.skillsScores);
        }
        if (skillsCtx) {
            this.charts.skills = new Chart(skillsCtx, {
                type: 'radar',
                data: {
                    labels: skillLabels,
                    datasets: [{
                        label: 'Your Skills',
                        data: skillData,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.2)',
                        pointBackgroundColor: '#1FB8CD',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f3f4f6' }
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            pointLabels: { color: '#f3f4f6' },
                            ticks: { color: '#9ca3af' }
                        }
                    }
                }
            });
        }
        // Personality Chart (from assessmentData.personalityScores or fallback)
        const personalityCtx = document.getElementById('personalityChart');
        let personalityLabels = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
        let personalityData = [85, 70, 60, 80, 30];
        if (this.assessmentData && this.assessmentData.personalityScores) {
            personalityLabels = Object.keys(this.assessmentData.personalityScores);
            personalityData = Object.values(this.assessmentData.personalityScores);
        }
        if (personalityCtx) {
            this.charts.personality = new Chart(personalityCtx, {
                type: 'doughnut',
                data: {
                    labels: personalityLabels,
                    datasets: [{
                        data: personalityData,
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                        borderWidth: 0,
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { 
                                color: '#f3f4f6',
                                padding: 15,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
        // Career Match Chart (from Gemini careerMatches)
        const matchCtx = document.getElementById('matchChart');
        let matchLabels = this.careerMatches.slice(0, 5).map(c => c.title.split(' ').slice(0, 2).join(' '));
        let matchData = this.careerMatches.slice(0, 5).map(c => c.matchPercentage);
        if (matchCtx) {
            this.charts.matches = new Chart(matchCtx, {
                type: 'bar',
                data: {
                    labels: matchLabels,
                    datasets: [{
                        label: 'Match Percentage',
                        data: matchData,
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'],
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f3f4f6' }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: '#f3f4f6' }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#9ca3af' }
                        }
                    }
                }
            });
        }
        
        console.log('✨ Premium charts created successfully');
    }

    generateLearningPath() {
        const timeline = document.getElementById('learningTimeline');
        if (!timeline) return;
        
        const steps = [
            { title: "Master Python Fundamentals", description: "Complete Python basics and advanced OOP concepts", duration: "2-3 months" },
            { title: "Machine Learning Mastery", description: "Study algorithms, model evaluation, and scikit-learn", duration: "3-4 months" },
            { title: "Deep Learning Specialization", description: "Neural networks, TensorFlow, and PyTorch", duration: "4-5 months" },
            { title: "MLOps & Production", description: "Deploy models, monitoring, and CI/CD pipelines", duration: "2-3 months" },
            { title: "AI Ethics & Industry Certification", description: "Responsible AI and cloud platform certifications", duration: "1-2 months" }
        ];
        
        timeline.innerHTML = steps.map((step, index) => `
            <div class="timeline-step" style="animation-delay: ${index * 0.1}s">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <h4>${step.title}</h4>
                    <p>${step.description}</p>
                    <div class="step-duration">⏱️ ${step.duration}</div>
                </div>
            </div>
        `).join('');
        
        console.log('🎓 Personalized learning path generated');
    }

    resetAssessment() {
        console.log('🔄 Resetting assessment for new journey');
        
        // Reset all data
        this.currentQuestion = 0;
        this.assessmentData = {
            technicalSkills: {},
            softSkills: {},
            personality: {},
            interests: {},
            values: {},
            responses: [],
            startTime: null,
            questionTimes: [],
            skillRatings: {}
        };
        
        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
        
        // Show landing page
        this.showPage('landing');
        
        // Trigger reset animation
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#6366f1', '#8b5cf6']
            });
        }
    }

    showExportModal() {
        const modal = document.getElementById('exportModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideExportModal() {
        const modal = document.getElementById('exportModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    exportResults(format) {
        console.log(`📄 Exporting results in ${format} format`);
        this.hideExportModal();
        
        const exportData = {
            assessmentResults: this.assessmentData,
            careerMatches: this.careerMatches,
            timestamp: new Date().toISOString(),
            totalTime: this.assessmentData.totalTime,
            completionDate: new Date().toLocaleDateString()
        };
        
        switch (format) {
            case 'json':
                this.exportJSON(exportData);
                break;
            case 'pdf':
                this.exportPDF(exportData);
                break;
            case 'linkedin':
                this.exportLinkedIn(exportData);
                break;
            default:
                console.log('Unknown export format');
        }
        
        // Show success feedback
        this.feedbackSystem.showInstantFeedback('achievement', 
            `Your career assessment has been exported successfully in ${format.toUpperCase()} format!`);
    }

    exportJSON(data) {
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = `ultimate-career-assessment-${Date.now()}.json`;
        link.click();
    }

    exportPDF(data) {
        // Ensure user info is present in data
        if (!data.userName && window.userInfo && window.userInfo.name) {
            data.userName = window.userInfo.name;
        }
        if (!data.userEmail && window.userInfo && window.userInfo.email) {
            data.userEmail = window.userInfo.email;
        }
        if (!data.userQualification && window.userInfo && window.userInfo.qualification) {
            data.userQualification = window.userInfo.qualification;
        }
        // Enhanced PDF export with premium UI
        if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
            alert('PDF export requires jsPDF. Please ensure jsPDF is loaded.');
            return;
        }
        const jsPDFClass = window.jspdf?.jsPDF || window.jsPDF;
        const doc = new jsPDFClass({ unit: 'pt', format: 'a4' });

        // Branding header
        doc.setFillColor(60, 28, 120);
        doc.rect(0, 0, 595, 90, 'F');
        doc.setTextColor(255,255,255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.text('Ultimate Career AI', 40, 55);
        doc.setFontSize(14);
        doc.text('Comprehensive Career Assessment Report', 40, 80);

        // Main content background
        doc.setFillColor(245, 243, 255);
        doc.rect(30, 110, 535, 680, 'F');

        // User & assessment info
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60,28,120);
        doc.setFontSize(16);
        doc.text('Assessment Summary', 50, 145);

        // User details
        doc.setFontSize(11);
        doc.setTextColor(80,80,120);
        let yUser = 170;
        if (data.userName) {
            doc.text('Name:', 50, yUser);
            doc.text(data.userName, 110, yUser);
            yUser += 18;
        }
        if (data.userEmail) {
            doc.text('Email:', 50, yUser);
            doc.text(data.userEmail, 110, yUser);
            yUser += 18;
        }
        if (data.userQualification) {
            doc.text('Qualification:', 50, yUser);
            doc.text(data.userQualification, 140, yUser);
            yUser += 18;
        }
        doc.text('Date:', 50, yUser);
        doc.text(data.completionDate || '', 110, yUser);
        yUser += 18;
        // Format total time as mm:ss
        let totalTimeStr = '';
        if (data.totalTime) {
            const mins = Math.floor(data.totalTime / 60000);
            const secs = Math.floor((data.totalTime % 60000) / 1000);
            totalTimeStr = `${mins} min${mins!==1?'s':''} ${secs} sec${secs!==1?'s':''}`;
        }
        doc.text('Total Time:', 50, yUser);
        doc.text(totalTimeStr, 130, yUser);
        yUser += 18;

        // Detailed Analysis Section
        if (data.detailedAnalysis) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(60,28,120);
            doc.text('Detailed Analysis:', 50, yUser + 10);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(80,80,120);
            doc.text(doc.splitTextToSize(data.detailedAnalysis, 480), 60, yUser + 28);
            yUser += 50;
        }


        // Top Career Match
        let y = yUser + 20;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(16,185,129);
        doc.text('Top Career Match', 50, y);
        y += 20;
        if (data.careerMatches && data.careerMatches.length > 0) {
            const top = data.careerMatches[0];
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(60,28,120);
            doc.text(top.title, 60, y);
            y += 18;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(80,80,120);
            doc.text(`Category: ${top.category}`, 60, y);
            y += 16;
            doc.text(`Match: ${top.matchPercentage}%`, 60, y);
            y += 16;
            if (top.description) {
                doc.setFontSize(11);
                doc.text(doc.splitTextToSize(top.description, 480), 60, y);
                y += 28;
            }
        }

        // All Career Matches
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(60,28,120);
        doc.text('All Career Matches', 50, y);
        y += 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(80,80,120);
        if (data.careerMatches && data.careerMatches.length > 0) {
            data.careerMatches.slice(0, 5).forEach((match, i) => {
                doc.text(`${i+1}. ${match.title} (${match.category}) - ${match.matchPercentage}%`, 60, y);
                y += 16;
            });
        }

        // Career Analysis Section
        if (data.careerAnalysis) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(60,28,120);
            doc.text('Career Analysis:', 50, y+16);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(80,80,120);
            doc.text(doc.splitTextToSize(data.careerAnalysis, 480), 60, y+34);
            y += 60;
        }


        // Skills & Recommendations
        if (data.assessmentResults && data.assessmentResults.skills) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(60,28,120);
            doc.text('Key Skills:', 50, y+20);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(80,80,120);
            doc.text(doc.splitTextToSize(data.assessmentResults.skills.join(', '), 480), 60, y+38);
            y += 60;
        }
        if (data.assessmentResults && data.assessmentResults.recommendations) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(60,28,120);
            doc.text('AI Recommendations:', 50, y+20);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(80,80,120);
            doc.text(doc.splitTextToSize(data.assessmentResults.recommendations, 480), 60, y+38);
        }

        // Footer
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(180,180,200);
        doc.text('Generated by Ultimate Career AI | elitecareer.ai', 40, 780);

        // Download as before
        doc.save(`ultimate-career-assessment-${Date.now()}.pdf`);

        // Send PDF to backend for emailing
        try {
            const pdfBase64 = doc.output('datauristring').split(',')[1];
            const email = (window.userInfo && window.userInfo.email) ? window.userInfo.email : null;
            console.log("Sending report:", { email, pdfBase64: pdfBase64 ? pdfBase64.slice(0, 30) + "..." : null });
            if (email && pdfBase64) {
                fetch('/sendCareerReport', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        pdfBase64,
                        filename: 'ultimate-career-assessment.pdf'
                    })
                })
                .then(res => res.text())
                .then(msg => {
                    alert('Success! Your detailed career report has been emailed to you. Please check your inbox for the PDF attachment.');
                })
                .catch(err => {
                    alert('Could not send report to email.');
                    console.error(err);
                });
            } else {
                alert('Missing email or PDF data.');
                console.error('Missing email or PDF data:', { email, pdfBase64 });
            }
        } catch (e) {
            console.error('Error sending PDF to email:', e);
        }
    }

    exportLinkedIn(data) {
        const topCareer = data.careerMatches[0];
        const summary = `🎯 Career Assessment Results: My top career match is ${topCareer.title} with a ${topCareer.matchPercentage}% compatibility score. Excited to pursue opportunities in ${topCareer.category}! #CareerDevelopment #AIAssessment`;
        // Download as .txt file
        const blob = new Blob([summary], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `linkedin-summary-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Also copy to clipboard for convenience
        if (navigator.clipboard) {
            navigator.clipboard.writeText(summary).then(() => {
                alert('📋 LinkedIn-ready summary copied to clipboard and downloaded!');
            }).catch(() => {
                alert('LinkedIn summary downloaded as .txt file.');
            });
        } else {
            alert('LinkedIn summary downloaded as .txt file.');
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
        
        localStorage.setItem('theme', newTheme);
        
        console.log(`🎨 Theme switched to ${newTheme} mode`);
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        console.log(`🎨 Theme initialized: ${theme}`);
    }
}

// Real-Time Feedback System
class RealTimeFeedbackSystem {
    constructor() {
        this.feedbackContainer = this.createFeedbackContainer();
        this.feedbackQueue = [];
        this.isShowing = false;
    }
    
    createFeedbackContainer() {
        let container = document.getElementById('feedbackSystem');
        if (!container) {
            container = document.createElement('div');
            container.id = 'feedbackSystem';
            container.className = 'feedback-system';
            container.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1001;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
        return container;
    }
    
    showInstantFeedback(type, message, score = null) {
        const feedback = {
            technical: {
                icon: '💻',
                color: '#6366f1',
                title: 'Technical Insight'
            },
            personality: {
                icon: '🧠',
                color: '#8b5cf6',
                title: 'Personality Insight'
            },
            achievement: {
                icon: '🎉',
                color: '#10b981',
                title: 'Achievement'
            },
            skill: {
                icon: '⭐',
                color: '#f59e0b',
                title: 'Skill Assessment'
            },
            info: {
                icon: '💡',
                color: '#06b6d4',
                title: 'Pro Tip'
            }
        };
        
        const feedbackData = feedback[type] || feedback.achievement;
        
        if (this.isShowing) {
            this.feedbackQueue.push({ type, message, score, feedbackData });
            return;
        }
        
        this.displayFeedback(message, score, feedbackData);
    }
    
    displayFeedback(message, score, feedbackData) {
        this.isShowing = true;
        
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'instant-feedback-premium';
        feedbackElement.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            max-width: 300px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
            transform: translateX(320px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
            cursor: pointer;
        `;
        
        feedbackElement.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="font-size: 24px; color: ${feedbackData.color};">
                    ${feedbackData.icon}
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #f3f4f6;">
                        ${feedbackData.title}
                    </h4>
                    <p style="margin: 0; font-size: 13px; color: #d1d5db; line-height: 1.4;">
                        ${message}
                    </p>
                    ${score ? `<div style="margin-top: 8px; font-size: 12px; color: ${feedbackData.color}; font-weight: 600;">Score: ${score}%</div>` : ''}
                </div>
                <div style="font-size: 18px; color: #9ca3af; cursor: pointer;" onclick="this.parentElement.parentElement.remove();">
                    ×
                </div>
            </div>
        `;
        
        this.feedbackContainer.appendChild(feedbackElement);
        
        // Animate in
        setTimeout(() => {
            feedbackElement.style.transform = 'translateX(0)';
            feedbackElement.style.opacity = '1';
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            feedbackElement.style.transform = 'translateX(320px)';
            feedbackElement.style.opacity = '0';
            setTimeout(() => {
                if (feedbackElement.parentNode) {
                    feedbackElement.remove();
                }
                this.isShowing = false;
                this.processQueue();
            }, 400);
        }, 4000);
        
        // Click to dismiss
        feedbackElement.onclick = () => {
            feedbackElement.style.transform = 'translateX(320px)';
            feedbackElement.style.opacity = '0';
            setTimeout(() => {
                if (feedbackElement.parentNode) {
                    feedbackElement.remove();
                }
                this.isShowing = false;
                this.processQueue();
            }, 400);
        };
    }
    
    processQueue() {
        if (this.feedbackQueue.length > 0) {
            const next = this.feedbackQueue.shift();
            setTimeout(() => {
                this.displayFeedback(next.message, next.score, next.feedbackData);
            }, 200);
        }
    }
}

// Initialize the Ultimate Career Advisor Application
console.log('🚀 Loading Ultimate AI Career Advisor...');
document.addEventListener('DOMContentLoaded', () => {
    window.ultimateCareerApp = new UltimateCareerAdvisorApp();
    window.app = window.ultimateCareerApp;
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    window.ultimateCareerApp = new UltimateCareerAdvisorApp();
    window.app = window.ultimateCareerApp;
}