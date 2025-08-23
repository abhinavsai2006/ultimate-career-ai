# Ultimate Career AI

Ultimate Career AI is an advanced, AI-powered career assessment and recommendation platform. It uses Gemini AI to analyze user skills, interests, and personality, then generates a personalized career report with top job matches and analytics.

## Features

- Interactive career assessment with premium UI/UX
- AI-powered career recommendations (Gemini AI)
- PDF report generation and email delivery
- Firebase Functions backend (Node.js)
- Firebase Hosting for frontend
- Modern, responsive design

## Tech Stack

- JavaScript (Frontend: Vanilla JS, Backend: Node.js)
- Firebase Functions & Hosting
- Nodemailer (for email)
- Chart.js (for analytics)
- Gemini AI API

## Getting Started

### Prerequisites

- Node.js & npm
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project (with Functions and Hosting enabled)
- Gmail account with App Password for email sending

### Setup

1. **Clone the repository:**
	```sh
	git clone https://github.com/abhinavsai2006/Ultimate-Carrer-AI.git
	cd Ultimate-Carrer-AI
	```

2. **Install dependencies:**
	```sh
	cd functions
	npm install
	cd ..
	```

3. **Set up Firebase config for Gmail:**
	```sh
	firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
	```

4. **Deploy functions and hosting:**
	```sh
	firebase deploy --only functions
	firebase deploy --only hosting
	```

5. **Access your app:**
	- Visit your Firebase Hosting URL after deployment.

## Usage

- Complete the assessment in the app.
- View your AI-powered career matches.
- Download or email your personalized PDF report.

## Project Structure

```
.
├── public/             # Frontend files (HTML, CSS, JS)
├── functions/          # Firebase Cloud Functions (Node.js backend)
├── dataconnect/        # Data connectors and schema
├── README.md
├── package.json
└── ...
```

## License

MIT

---

**Made with ❤️ by Abhinav Sai and contributors**
