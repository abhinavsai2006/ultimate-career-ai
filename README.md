# Ultimate Career AI

<<<<<<< HEAD
Ultimate Career AI is an advanced, AI-powered career assessment and recommendation platform. It uses Gemini AI to analyze user skills, interests, and personality, then generates a personalized career report with top job matches and analytics.

## Features

- Interactive career assessment with premium UI/UX
- AI-powered career recommendations (Gemini AI)
- PDF report generation and email delivery
- Modern, responsive design

## Tech Stack

- JavaScript (Frontend: Vanilla JS)
- Vite (for development and building)
- Chart.js (for analytics)
- Gemini AI API

## Setup

1. Clone the repository
```bash
git clone https://github.com/abhinavsai2006/Ultimate-career-ai.git
cd Ultimate-career-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your API keys
   ```bash
   cp .env.example .env
   ```
   
   Required API keys:
   - `GEMINI_API_KEY`: Get this from the [Google Cloud Console](https://console.cloud.google.com)
     - Create a new project or use an existing one
     - Enable the Gemini API
     - Create API credentials with appropriate restrictions

4. Start development server
```bash
npm run dev
```

5. For production build
```bash
npm run build
```

## Security Notes

- Never commit `.env` file to the repository
- Always use environment variables for API keys
- Set up API key restrictions in Google Cloud Console
- Keep your API keys private and secure

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
=======
**Ultimate Career AI** is an advanced AI-powered career assessment and recommendation platform. Harnessing the power of Gemini AI, it analyzes your skills, interests, and personality to generate a truly personalized career report—complete with top job matches and intuitive analytics.

---

## 🚀 Features

- **Interactive Career Assessment**  
  Engaging user experience with a modern, premium UI/UX.

- **AI-Powered Recommendations**  
  Gemini AI delivers smart, personalized career guidance.

- **Professional PDF Reports**  
  Instantly download or receive your detailed career report via email.

- **Insightful Analytics**  
  Visualize your strengths with rich charts powered by Chart.js.

- **Robust Cloud Backend**  
  Scalable backend built with Node.js on Firebase Functions.

- **Seamless Deployment**  
  Easy, one-click deployment to Firebase Hosting.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Backend:** Node.js (Firebase Functions)
- **Cloud:** Firebase Hosting & Functions
- **AI:** Gemini AI API
- **Email:** Nodemailer (Gmail App Password)
- **Analytics:** Chart.js

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & npm
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- A Firebase project (with Functions & Hosting enabled)
- Gmail account (with [App Password](https://support.google.com/mail/answer/185833))
  
### Setup

1. **Clone the repository**
    ```sh
    git clone https://github.com/abhinavsai2006/Ultimate-Career-AI.git
    cd Ultimate-Career-AI
    ```

2. **Install dependencies**
    ```sh
    cd functions
    npm install
    cd ..
    ```

3. **Configure Gmail for email delivery**
    ```sh
    firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
    ```

4. **Deploy to Firebase**
    ```sh
    firebase deploy --only functions
    firebase deploy --only hosting
    ```

5. **Access your app**
    - Visit your Firebase Hosting URL (shown after deploy).

---

## 📝 Usage

1. **Take the career assessment** in the app.
2. **Review your AI-powered career matches.**
3. **Download or email** your personalized PDF report.

---

## 📦 Project Structure

```
.
├── public/             # Frontend (HTML, CSS, JS)
├── functions/          # Backend (Firebase Functions)
├── dataconnect/        # Data connectors & schema
├── README.md
├── package.json
└── ...
```

---

## 🪪 License

MIT License

---

<p align="center">
  <b></b>
</p>
>>>>>>> 9291fbd06ddda3ef8d3c80f666535ad3907c3c8a
