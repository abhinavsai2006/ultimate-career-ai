# Ultimate Career AI

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
