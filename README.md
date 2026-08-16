# House of Astrology

A premium, lightweight astrology consultation website with booking system, Razorpay payment integration, and email notifications.

## Tech Stack

### Frontend
- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- React Router

### Backend
- Python + Django
- Django REST Framework
- PostgreSQL (SQLite for development)

### Payment
- Razorpay

## Project Structure

```
house_of_astrology/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── types/       # TypeScript types
│   │   └── App.tsx      # Main app with routing
│   └── package.json
│
├── backend/           # Django backend
│   ├── config/        # Django project settings
│   ├── services/      # Service model and API
│   ├── bookings/      # Customer, Slot, Booking models
│   ├── payments/      # Razorpay payment integration
│   ├── notifications/ # Email notifications
│   └── manage.py
│
└── house_of_astrology_full_implementation_plan.md
```

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
DJANGO_SECRET_KEY=
DEBUG=True
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
OWNER_EMAIL=
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=
```

## Features

- ✅ Premium dark astrology-themed UI
- ✅ Gold accents and elegant typography
- ✅ Astrology/cosmic animations
- ✅ Consultation/service pricing
- ✅ Real-time appointment slot availability
- ✅ Disabled/unavailable slots
- ✅ Customer booking flow
- ✅ Razorpay payment gateway
- ✅ UPI/card/net-banking support
- ✅ Booking confirmation
- ✅ Owner email notification
- ✅ Customer confirmation email
- ✅ Django Admin for management
- ✅ Responsive mobile/desktop design