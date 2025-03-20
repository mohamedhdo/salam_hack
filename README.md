# FitGenAI

## Overview
FitGenAI is an intelligent fitness and nutrition assistant that generates personalized workout and meal plans based on user inputs such as fitness goal and health conditions. Built for the **Salam Hack** hackathon, FitGenAI leverages generative AI to offer customized fitness guidance, making health and wellness more accessible and effective.

## Features
- **Personalized Workout Plans**: Generates exercise routines based on user goals (e.g., weight loss, muscle gain, endurance training).
- **Custom Meal Plans**: Suggests balanced nutrition plans tailored to dietary preferences (e.g., vegetarian, keto, high-protein).
- **Simple & Interactive Interface**: User-friendly experience for seamless interaction.

## Tech Stack
- **Backend**: Django REST Framework (DRF), Python
- **Frontend**: React.js
- **Database**: SQLite3
- **AI Integration**: Qwen AI API

## Installation & Setup
### Prerequisites
- Python 3.8+
- Node.js & npm
- Django and Django rest framework

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/mohamedhdo/salam_hack
cd salam_hack-main/backend/gymai
# Set up database
python manage.py migrate

# Run the server
python manage.py runserver
```

### Frontend Setup
```bash
cd ../frontend/vite-project
npm install
npm run dev
```

## Usage
1. Input fitness goals and health conditions.
2. Generate personalized workout and meal plans.

## Team
FitGenAI was developed by **DZCoders**, a team of four passionate developers at **Salam Hack**:
- **Backend Developers**: [HADDOU Mohamed], [Houari mohamed]
- **Frontend Developers**: [Saheb mohamed aymen], [guerri ryad]


## Acknowledgments
- **Salam Hack** for hosting the hackathon.
- Qwen AI for providing generative AI capabilities.
---

Feel free to contribute to FitGenAI and help improve AI-powered fitness solutions!
