class UltimateCareerAdvisor {
    constructor() {
        this.currentPage = 'landing';
        this.currentQuestion = 0;
        this.totalQuestions = 35;
        this.assessmentData = {
            technicalSkills: {},
            softSkills: {},
            personality: {},
            interests: {},
            values: {},
            responses: [],
            startTime: null,
            questionTimes: []
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.attachEventListeners();
        this.setupQuestions();
        this.showPage('landing');
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }
    }

    attachEventListeners() {
        // Start Assessment Button
        const startBtn = document.getElementById('startAssessment');
        if (startBtn) {
            startBtn.onclick = () => {
                document.getElementById('userInfoModal').classList.remove('hidden');
            };
        }

        // User Info Form
        const userInfoForm = document.getElementById('userInfoForm');
        if (userInfoForm) {
            userInfoForm.onsubmit = (e) => {
                e.preventDefault();
                this.startAssessment();
            };
        }

        // Navigation Buttons
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        if (nextBtn) {
            nextBtn.onclick = () => this.nextQuestion();
        }
        if (prevBtn) {
            prevBtn.onclick = () => this.previousQuestion();
        }

        // Modal Close Button
        const cancelUserInfo = document.getElementById('cancelUserInfo');
        if (cancelUserInfo) {
            cancelUserInfo.onclick = () => {
                document.getElementById('userInfoModal').classList.add('hidden');
            };
        }
    }

    setupQuestions() {
        this.questions = [
            {
                category: 'Technical Skills',
                type: 'skill_matrix',
                question: 'Rate your proficiency in these programming languages:',
                options: ['Python', 'JavaScript', 'Java', 'SQL']
            },
            // Add more questions here...
        ];
    }

    startAssessment() {
        document.getElementById('userInfoModal').classList.add('hidden');
        this.assessmentData.startTime = Date.now();
        this.currentQuestion = 0;
        this.showPage('assessment');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        if (!question) {
            this.completeAssessment();
            return;
        }

        // Update progress
        const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-text').textContent = 
            `Question ${this.currentQuestion + 1} of ${this.totalQuestions}`;

        // Update question content
        document.querySelector('.question-category').textContent = question.category;
        document.querySelector('.question-title').textContent = question.question;

        // Enable/disable navigation buttons
        document.getElementById('prevBtn').disabled = this.currentQuestion === 0;
        document.getElementById('nextBtn').disabled = false;
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    completeAssessment() {
        this.showPage('results');
        this.generateResults();
    }

    generateResults() {
        // Process assessment data and generate results
        console.log('Generating results...');
        // Add result generation logic here
    }

    async analyzeWithAI(data) {
        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: 'Analyze career assessment data',
                    data: data
                })
            });

            if (!response.ok) {
                throw new Error('AI analysis failed');
            }

            return await response.json();
        } catch (error) {
            console.error('AI Analysis Error:', error);
            return null;
        }
    }
}

// Initialize the app
const app = new UltimateCareerAdvisor();