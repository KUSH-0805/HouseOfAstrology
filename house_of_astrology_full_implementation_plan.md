# House of Astrology — Full Implementation Plan

## 1. Project Overview

**Project:** House of Astrology  
**Domain:** `houseofastrology.in`

House of Astrology will be a premium, lightweight astrology consultation website with:

- Premium dark astrology-themed UI
- Gold accents and elegant typography
- Astrology/cosmic animations
- Consultation/service pricing
- Real-time appointment slot availability
- Disabled/unavailable slots
- Customer booking flow
- Razorpay payment gateway
- UPI/card/net-banking support through Razorpay
- Booking confirmation
- Owner email notification
- Customer confirmation email
- Django Admin for managing services, slots, bookings and payments
- Responsive mobile/desktop design
- Architecture that can scale to a larger backend later

The uploaded design reference is the primary visual specification.

---

# 2. Final Technology Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- React Router

## Backend

- Python
- Django
- Django REST Framework

## Database

- PostgreSQL

## Payment

- Razorpay

## Notifications

- Email initially
- WhatsApp integration later if required

## Deployment

- Frontend: Vercel
- Backend: Render / Railway initially
- Database: Managed PostgreSQL
- Domain: `houseofastrology.in`

## Development

- Git
- GitHub
- VS Code
- AI coding assistant such as Gemini/Codex/Copilot

---

# 3. High-Level Architecture

```text
                         USER
                           |
                           v
                    React Frontend
                           |
                           | REST API
                           v
                 Django REST Framework
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
        PostgreSQL      Razorpay      Email
             |             |
             |             v
             |          Payment
             |
             v
      Bookings / Slots /
      Services / Users
```

React must never directly access PostgreSQL.

All business logic and sensitive operations go through Django.

---

# 4. Design Direction

The uploaded design should be treated as the primary UI reference.

## Visual Style

- Premium
- Minimal
- Dark
- Elegant
- Calm
- Astrology-inspired
- Trustworthy
- Not overly colorful

## Color Palette

Approximate palette from the design:

```text
Deep Black     #0D0D0F
Charcoal       #141418
Dark Slate     #1D1D20
Gold           #D4AF37
Soft White     #F5F5F5
```

Gold should be muted rather than excessively bright.

## Typography

Recommended:

- Headings: Playfair Display or similar elegant serif
- Body: Inter or similar modern sans-serif

---

# 5. Website Structure

```text
HOUSE OF ASTROLOGY
|
+-- HOME
|
+-- ABOUT
|   +-- My Journey
|   +-- Approach
|   +-- Why Choose Me
|
+-- SERVICES
|   +-- All Services
|   +-- Career Guidance
|   +-- Relationship Consultation
|   +-- Life Purpose Reading
|   +-- Birth Chart Reading
|
+-- PRICING
|   +-- Packages
|   +-- What's Included
|   +-- FAQ
|
+-- CONTACT
|   +-- Contact Form
|   +-- Book Appointment
|   +-- FAQ
|
+-- BOOK APPOINTMENT
```

---

# 6. Homepage

The homepage should follow the supplied design:

```text
NAVBAR
   |
HERO
   |
ABOUT PREVIEW
   |
SERVICES OVERVIEW
   |
HOW IT WORKS
   |
CTA BANNER
   |
FOOTER
```

---

# 7. Navbar

Desktop:

```text
HOUSE OF ASTROLOGY

Home
About
Services
Pricing
Contact

[ Book Appointment ]
```

Mobile:

```text
HOUSE OF ASTROLOGY                    [MENU]
```

Navbar behavior:

- Transparent/dark at top
- Semi-transparent dark background on scroll
- Backdrop blur
- Subtle border
- Smooth transition

---

# 8. Hero Section

Main message from the design:

> Clarity.  
> Guidance.  
> Real Connection.

Supporting text:

> Intuitive astrology for real-life answers and a better tomorrow.

Primary CTA:

> Book Your Consultation

Visual:

- Moon
- Stars
- Cosmic background
- Gold orbital circle
- Subtle constellation elements

Animations:

- Slow moon movement
- Slow orbital rotation
- Subtle star twinkle
- Very slow background movement
- Button hover animation
- Section entrance animations

Avoid excessive animations.

---

# 9. About Section

Design concept:

> Astrology with Intellect. Insights. Impact.

Include:

- Astrologer's biography
- Journey
- Philosophy
- Approach
- Experience
- CTA

Statistics card:

```text
7+
Years of Study & Practice

1000+
Consultations Guided

Vedic
Rooted in Ancient Wisdom

Real
Practical. Honest. Result-Oriented.
```

These values should eventually be configurable rather than hardcoded throughout the frontend.

---

# 10. Services Section

Initial services:

1. Career & Finance Guidance
2. Relationship Consultation
3. Life Purpose Reading
4. Birth Chart Reading

Each service card should include:

- Icon
- Service name
- Short description
- Duration
- Price
- Learn More
- Book Now

Services and prices must come from Django/PostgreSQL.

Example API:

```http
GET /api/services/
```

Example response:

```json
[
  {
    "id": 1,
    "name": "Career & Finance Guidance",
    "description": "Guidance for professional growth and success.",
    "duration": 30,
    "price": 999,
    "is_active": true
  }
]
```

---

# 11. Service Detail Pages

Example:

```text
/services/career-guidance
/services/relationship-consultation
/services/life-purpose-reading
/services/birth-chart-reading
```

Page structure:

```text
Hero
  |
About Consultation
  |
Who Is It For?
  |
What You Receive
  |
Duration
  |
Price
  |
How It Works
  |
FAQ
  |
[ Book This Consultation ]
```

This structure is also useful for SEO.

---

# 12. Pricing Page

Pricing should be database-driven.

Example:

```text
Career Guidance
30 Minutes
₹999

Relationship Consultation
45 Minutes
₹1499

Life Purpose Reading
45 Minutes
₹1299

Birth Chart Reading
60 Minutes
₹1999
```

The owner should be able to change prices through Django Admin.

---

# 13. How It Works Section

Use the four-step flow from the design:

```text
01 BOOK
Choose a service and book your slot.

02 CONSULT
Connect at the scheduled time.

03 GUIDANCE
Get clear and practical guidance.

04 TRANSFORM
Take confident steps toward a better you.
```

---

# 14. Booking Flow

The booking experience should contain six steps:

```text
1. Select Service
2. Choose Date
3. Choose Time
4. Enter Details
5. Payment
6. Confirmation
```

---

# 15. Step 1 — Select Service

Display active services retrieved from Django.

User selects one service.

Example:

```text
+-----------------------------+
| Career & Finance Guidance   |
| 30 Minutes                  |
| ₹999                        |
|                             |
| [ Select ]                  |
+-----------------------------+
```

---

# 16. Step 2 — Select Date

Display calendar.

Dates with no available slots should be disabled.

Example:

```text
       August 2026

Mon Tue Wed Thu Fri Sat Sun
                 1   2
 3   4   5   6   7   8   9
10  11  12  13  14  15  16
17  18  19  20  21  22  23
24  25  26  27  28  29  30
31
```

The frontend gets availability from Django.

Example:

```http
GET /api/availability/?date=2026-08-20
```

---

# 17. Step 3 — Time Slots

Available slots should be enabled.

Unavailable slots should be visibly disabled.

Example:

```text
AVAILABLE

[ 10:00 AM ]
[ 10:30 AM ]
[ 11:00 AM ]


UNAVAILABLE

[ 11:30 AM ]  disabled
[ 12:00 PM ]  disabled


AVAILABLE

[ 12:30 PM ]
[ 01:00 PM ]
```

Backend remains the source of truth.

React must not assume a slot is available simply because it was previously displayed as available.

---

# 18. Step 4 — Customer Details

Fields:

```text
Full Name
Email
Phone Number

Date of Birth
Time of Birth
Place of Birth

Additional Question / Message
```

Required/optional fields can depend on the selected consultation.

Example:

```text
Birth Chart Reading
-> DOB required
-> Birth time required
-> Birth place required

General consultation
-> These can be optional if desired
```

---

# 19. Step 5 — Payment

Use Razorpay.

Payment flow:

```text
React
  |
  v
Django
  |
  v
Create Razorpay Order
  |
  v
React opens Razorpay Checkout
  |
  v
Customer pays
  |
  v
Django verifies payment
  |
  v
Razorpay webhook
  |
  v
PostgreSQL updated
  |
  v
Booking confirmed
```

Possible payment methods:

- UPI
- Cards
- Net Banking

Actual availability depends on the Razorpay merchant account/configuration.

---

# 20. Payment Security

Never expose:

```text
RAZORPAY_KEY_SECRET
```

to React.

Only the public Razorpay key can be exposed to the frontend.

Secret credentials must remain in Django environment variables.

Example:

```text
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

---

# 21. Payment States

Recommended payment states:

```text
CREATED
PENDING
SUCCESS
FAILED
REFUNDED
```

Booking states:

```text
PENDING_PAYMENT
CONFIRMED
CANCELLED
EXPIRED
```

---

# 22. Temporary Slot Hold

Recommended implementation:

```text
User selects slot
      |
      v
Slot HELD for 10 minutes
      |
      v
Payment
   |       |
SUCCESS   FAILED/TIMEOUT
   |       |
   v       v
BOOKED   AVAILABLE
```

This prevents another customer from taking the slot while the first customer is completing payment.

---

# 23. Prevent Double Booking

This is a critical backend requirement.

Example:

```text
User A -> 10:00 AM
User B -> 10:00 AM
```

Expected:

```text
User A -> BOOKED
User B -> SLOT UNAVAILABLE
```

Never rely only on React for this.

Use:

- PostgreSQL transactions
- Database constraints
- Row-level locking where appropriate
- Django backend validation

---

# 24. Database Design

Main models/tables:

```text
Customer
Service
Slot
Booking
Payment
Notification
```

---

# 25. Customer Model

```text
Customer
---------
id
name
email
phone
date_of_birth
time_of_birth
place_of_birth
created_at
updated_at
```

---

# 26. Service Model

```text
Service
---------
id
name
slug
description
duration
price
is_active
created_at
updated_at
```

Use `slug` for SEO-friendly URLs.

Example:

```text
career-guidance
relationship-consultation
birth-chart-reading
```

---

# 27. Slot Model

```text
Slot
---------
id
date
start_time
end_time
status
created_at
updated_at
```

Status:

```text
AVAILABLE
BLOCKED
BOOKED
HELD
```

---

# 28. Booking Model

```text
Booking
---------
id
booking_number
customer
service
slot
booking_status
amount
notes
created_at
updated_at
```

Example booking number:

```text
HOA-20260820-001
```

---

# 29. Payment Model

```text
Payment
---------
id
booking
razorpay_order_id
razorpay_payment_id
razorpay_signature
amount
status
created_at
updated_at
```

Never store unnecessary sensitive payment data.

---

# 30. Notification Model

Optional but recommended:

```text
Notification
-------------
id
booking
type
recipient
status
sent_at
created_at
```

Types:

```text
CUSTOMER_EMAIL
OWNER_EMAIL
WHATSAPP
```

---

# 31. Database Relationships

```text
Customer
    |
    | 1
    |
    | *
  Booking
    |
    +------ Service
    |
    +------ Slot
    |
    +------ Payment
```

Meaning:

- One customer can have many bookings
- One service can have many bookings
- One slot can have at most one confirmed booking
- One booking can have payment records according to the payment design

---

# 32. Django Project Structure

```text
backend/
|
+-- manage.py
|
+-- config/
|   +-- settings.py
|   +-- urls.py
|   +-- wsgi.py
|   +-- asgi.py
|
+-- users/
|   +-- models.py
|   +-- serializers.py
|   +-- views.py
|   +-- urls.py
|
+-- services/
|   +-- models.py
|   +-- serializers.py
|   +-- views.py
|   +-- urls.py
|
+-- bookings/
|   +-- models.py
|   +-- serializers.py
|   +-- views.py
|   +-- services.py
|   +-- urls.py
|
+-- payments/
|   +-- models.py
|   +-- services.py
|   +-- views.py
|   +-- urls.py
|
+-- notifications/
|   +-- services.py
|   +-- ...
|
+-- common/
```

---

# 33. Frontend Project Structure

```text
frontend/
|
+-- src/
|   |
|   +-- assets/
|   |
|   +-- components/
|   |   +-- Navbar/
|   |   +-- Footer/
|   |   +-- Button/
|   |   +-- ServiceCard/
|   |   +-- BookingCalendar/
|   |   +-- TimeSlot/
|   |   +-- ZodiacAnimation/
|   |
|   +-- pages/
|   |   +-- Home/
|   |   +-- About/
|   |   +-- Services/
|   |   +-- Pricing/
|   |   +-- Contact/
|   |   +-- Booking/
|   |   +-- Confirmation/
|   |
|   +-- services/
|   |   +-- api.ts
|   |   +-- bookingService.ts
|   |   +-- serviceService.ts
|   |   +-- paymentService.ts
|   |
|   +-- hooks/
|   +-- types/
|   +-- utils/
|   +-- animations/
|   |
|   +-- App.tsx
|   +-- main.tsx
|
+-- package.json
```

---

# 34. API Design

## Services

```http
GET /api/services/
GET /api/services/{id}/
```

## Availability

```http
GET /api/availability/?date=2026-08-20
```

## Slots

```http
GET /api/slots/
GET /api/slots/{id}/
```

## Booking

```http
POST /api/bookings/
GET /api/bookings/{id}/
```

## Payment

```http
POST /api/payments/create-order/
POST /api/payments/verify/
POST /api/payments/webhook/
```

## Contact

```http
POST /api/contact/
```

---

# 35. Booking API Example

Request:

```json
{
  "service_id": 2,
  "slot_id": 15,
  "customer": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "98XXXXXXXX",
    "date_of_birth": "1998-05-10",
    "time_of_birth": "10:30",
    "place_of_birth": "Delhi"
  },
  "notes": "Career-related questions"
}
```

Backend process:

```text
Validate service
      |
Validate slot
      |
Check availability
      |
Lock/reserve slot
      |
Create booking
      |
Create Razorpay order
      |
Return payment details
```

---

# 36. Booking Confirmation

Success screen:

```text
✓

BOOKING CONFIRMED

Thank you, Rahul.

Career Guidance

20 August 2026
10:00 AM

₹999
Payment Successful

Booking ID
HOA-20260820-001

[ Back to Home ]
```

---

# 37. Owner Notification

After successful booking:

```text
NEW BOOKING

Booking ID:
HOA-20260820-001

Customer:
Rahul Sharma

Consultation:
Career Guidance

Date:
20 August 2026

Time:
10:00 AM

Amount:
₹999

Payment:
SUCCESS
```

Send to the owner's email.

---

# 38. Customer Notification

Example:

```text
Subject: House of Astrology — Booking Confirmed

Hello Rahul,

Your consultation has been successfully booked.

Service:
Career Guidance

Date:
20 August 2026

Time:
10:00 AM

Booking ID:
HOA-20260820-001

Payment:
Successful

Thank you,
House of Astrology
```

---

# 39. Contact Form

Fields:

```text
Name
Email
Phone
Message
```

Flow:

```text
React
  |
  v
POST /api/contact/
  |
  v
Django
  |
  v
Owner Email
```

---

# 40. WhatsApp Integration

Implement later rather than making it a V1 dependency.

Future flow:

```text
Booking Confirmed
       |
       v
Django
       |
       v
WhatsApp API
       |
       v
Customer
```

Possible message:

```text
Your House of Astrology consultation
has been confirmed.

Date: 20 August
Time: 10:00 AM
Booking ID: HOA-20260820-001
```

---

# 41. Admin Panel

Use Django Admin for V1.

Admin should manage:

```text
Services
Prices
Bookings
Customers
Slots
Payments
```

Examples:

```text
Services
---------
Career Guidance       ₹999   ACTIVE
Relationship           ₹1499  ACTIVE
Birth Chart            ₹1999  ACTIVE
```

Slots:

```text
20 Aug 2026
10:00 AM  AVAILABLE
10:30 AM  BOOKED
11:00 AM  BLOCKED
```

Later, create a custom React admin dashboard.

---

# 42. Custom Admin Dashboard — Future

Possible dashboard:

```text
+------------------------------------------+
| HOUSE OF ASTROLOGY ADMIN                 |
+------------------------------------------+
|                                          |
| Today's Bookings       8                 |
| Upcoming Bookings     21                 |
| Revenue             ₹18,450              |
| Available Slots       14                 |
|                                          |
+------------------------------------------+
| Upcoming Bookings                        |
|                                          |
| Rahul     Career       10:00 AM  PAID    |
| Priya     Relationship 11:00 AM  PAID    |
| Amit      Birth Chart   2:00 PM  PAID    |
+------------------------------------------+
```

---

# 43. Astrology Graphics

Use lightweight visuals:

- SVG zodiac symbols
- Moon
- Stars
- Constellations
- Orbital lines
- Planet illustrations
- Subtle glow
- Gold line art

Recommended:

```text
CSS
+
SVG
+
Framer Motion
```

Avoid heavy 3D libraries unless truly needed.

---

# 44. Responsive Design

Desktop:

```text
[Card] [Card] [Card] [Card]
```

Mobile:

```text
[Card]
[Card]
[Card]
[Card]
```

Booking UI must be especially mobile-friendly.

Mobile booking:

```text
Service
   ↓
Date
   ↓
Time
   ↓
Details
   ↓
Payment
   ↓
Confirmation
```

---

# 45. Performance

Use:

- SVG where possible
- WebP/AVIF images
- Lazy loading
- Code splitting
- Optimized fonts
- Minimal dependencies
- CSS animations where sufficient
- Framer Motion only where useful

Avoid:

- Large background videos
- Large GIFs
- Unnecessary JavaScript animation libraries
- Huge image assets

---

# 46. SEO

Recommended pages:

```text
/
 /about
 /services
 /services/career-guidance
 /services/relationship-consultation
 /services/life-purpose-reading
 /services/birth-chart-reading
 /pricing
 /contact
```

Implement:

- SEO titles
- Meta descriptions
- OpenGraph metadata
- Semantic HTML
- Sitemap
- robots.txt
- Favicon
- Structured data where appropriate

---

# 47. Security

Implement:

- HTTPS
- CORS configuration
- CSRF protection
- Input validation
- Authentication/authorization for admin
- Rate limiting
- PostgreSQL constraints
- Payment signature verification
- Razorpay webhook verification
- Environment variables
- Secure cookies where applicable
- Database backups
- Logging

Never expose:

```text
DATABASE_PASSWORD
DJANGO_SECRET_KEY
RAZORPAY_KEY_SECRET
EMAIL_PASSWORD/API_SECRET
```

to the frontend.

---

# 48. Environment Variables

Backend:

```text
DJANGO_SECRET_KEY=
DEBUG=False

DATABASE_URL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

Frontend:

```text
VITE_API_BASE_URL=
VITE_RAZORPAY_KEY_ID=
```

Only public values should be placed in frontend environment variables.

---

# 49. Development Phases

## Phase 0 — Requirements & Architecture

Before coding:

- Analyze supplied design
- Finalize pages
- Finalize database
- Finalize API structure
- Finalize booking flow
- Finalize payment flow
- Define security rules

Deliverable:

```text
Architecture approved
```

---

## Phase 1 — Project Setup

Create:

```text
React + Vite + TypeScript
Django + DRF
PostgreSQL
Git + GitHub
```

Verify:

```text
React <-> Django <-> PostgreSQL
```

---

## Phase 2 — UI Implementation

Recreate the supplied design:

- Navbar
- Hero
- About
- Services
- How It Works
- CTA
- Footer
- Responsive layout
- Astrology animations

At this stage, use mock data.

Do not implement payment yet.

---

## Phase 3 — Services & Pricing Backend

Create:

- Service model
- Service API
- Pricing API
- Django Admin management

Connect React to Django.

Flow:

```text
PostgreSQL
    |
Django
    |
REST API
    |
React
```

---

## Phase 4 — Booking System

Implement:

- Service selection
- Calendar
- Availability
- Disabled dates
- Time slots
- Disabled slots
- Customer details
- Slot holding
- Booking creation
- Double-booking protection

---

## Phase 5 — Razorpay

Implement:

- Razorpay order creation
- Checkout
- Payment verification
- Payment status
- Webhooks
- Failed payment handling
- Payment cancellation
- Slot release
- Booking confirmation

Start with Razorpay test mode.

Only move to production credentials after full testing.

---

## Phase 6 — Notifications

Implement:

- Customer confirmation email
- Owner booking email
- Contact form email

Optional:

- WhatsApp

---

## Phase 7 — Admin

Use Django Admin initially.

Manage:

- Services
- Prices
- Slots
- Bookings
- Customers
- Payments

---

## Phase 8 — Testing

Test:

### Frontend

- Desktop
- Tablet
- Mobile
- Navigation
- Animations
- Forms

### Booking

- Available slot
- Unavailable slot
- Two users selecting same slot
- Slot timeout
- Booking cancellation

### Payment

- Successful payment
- Failed payment
- Cancelled payment
- Webhook
- Payment verification
- Duplicate webhook

### Security

- Unauthorized API calls
- Invalid data
- Rate limiting
- Secret exposure
- CORS
- CSRF

---

## Phase 9 — Production

Deploy:

```text
React
  ->
Vercel

Django
  ->
Render / Railway

PostgreSQL
  ->
Managed PostgreSQL
```

Configure:

- Custom domain
- HTTPS
- DNS
- Production environment variables
- Razorpay production credentials
- Email
- Database backups
- Logging

---

# 50. Scaling Plan

Do not build a complex distributed system from day one.

## V1

```text
React
  |
Django
  |
PostgreSQL
```

## Growing

Add:

```text
Redis
Celery
```

Useful for:

- Email
- Reminders
- WhatsApp
- Scheduled tasks
- Background jobs
- Caching

Architecture:

```text
React
  |
Django
  |
+-------------------+
|                   |
PostgreSQL         Redis
                     |
                   Celery
                     |
             Email/WhatsApp/etc.
```

## Larger scale

Potential future architecture:

```text
                    React
                      |
                Load Balancer
                      |
              Django API Servers
                 /         \
                /           \
            Redis        PostgreSQL
              |
            Celery
              |
      +-------+-------+
      |       |       |
    Email  WhatsApp Calendar
```

Only introduce these components when actual traffic/requirements justify them.

---

# 51. Recommended Implementation Principles

1. Keep React and Django completely separated.
2. React communicates through REST APIs.
3. PostgreSQL is accessed only by Django.
4. Backend is the source of truth for slot availability.
5. Never trust frontend payment status.
6. Verify Razorpay payments server-side.
7. Verify Razorpay webhooks.
8. Prevent double booking at the database/backend level.
9. Keep secrets in environment variables.
10. Keep service/pricing data database-driven.
11. Use Django Admin before building a custom admin dashboard.
12. Keep animations subtle and performant.
13. Build mobile responsiveness from the beginning.
14. Keep the code modular so a future backend scaling step is straightforward.
15. Do not introduce microservices unless the application actually needs them.

---

# 52. Final Architecture

```text
+-------------------------------------------------------+
|                  HOUSE OF ASTROLOGY                   |
|                                                       |
|                 React + Vite                         |
|        TypeScript + Tailwind + Motion                 |
+---------------------------+---------------------------+
                            |
                         REST API
                            |
                            v
+-------------------------------------------------------+
|                       DJANGO                         |
|                                                       |
|                 Django REST Framework                 |
|                                                       |
| Users | Services | Bookings | Payments | Notifications|
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                    POSTGRESQL                         |
|                                                       |
| Customers | Services | Slots | Bookings | Payments   |
+---------------------------+---------------------------+
                            |
              +-------------+-------------+
              |                           |
              v                           v
          RAZORPAY                      EMAIL
              |
       +------+------+ 
       |      |      |
      UPI   Cards  NetBanking
```

---

# 53. Complete Customer Journey

```text
                  HOME PAGE
                      |
                      v
              Choose Consultation
                      |
                      v
                 Choose Date
                      |
                      v
                 Choose Time
                      |
                      v
              Enter Details
                      |
                      v
               Slot HELD
                      |
                      v
             Razorpay Checkout
                      |
              +-------+-------+
              |               |
           SUCCESS           FAILED
              |               |
              v               v
          Verify          Release Slot
          Payment
              |
              v
       BOOKING CONFIRMED
              |
        +-----+------+
        |            |
        v            v
     Customer      Owner
      Email        Email
        |
        v
    Consultation
```

---

# 54. Definition of Done

The first production release is complete only when:

- [ ] Homepage matches design reference
- [ ] Responsive on mobile
- [ ] About page works
- [ ] Services page works
- [ ] Pricing page works
- [ ] Contact form works
- [ ] Service data comes from backend
- [ ] Prices come from backend
- [ ] Calendar works
- [ ] Available slots are enabled
- [ ] Unavailable slots are disabled
- [ ] Double booking is prevented
- [ ] Temporary slot hold works
- [ ] Customer details are stored
- [ ] Razorpay test payment works
- [ ] Payment is verified server-side
- [ ] Razorpay webhook works
- [ ] Failed payment releases slot
- [ ] Successful payment confirms booking
- [ ] Customer receives confirmation
- [ ] Owner receives booking notification
- [ ] Django Admin works
- [ ] Production database is configured
- [ ] HTTPS is enabled
- [ ] Domain is connected
- [ ] Secrets are not exposed
- [ ] Basic SEO is configured
- [ ] Error handling is implemented
- [ ] Production backup strategy exists

---

# 55. Recommended Build Order

The actual implementation should happen in this order:

```text
1. Project setup
        |
2. Design system
        |
3. Homepage
        |
4. About
        |
5. Services
        |
6. Pricing
        |
7. Contact
        |
8. PostgreSQL models
        |
9. Django APIs
        |
10. Connect React to APIs
        |
11. Booking calendar
        |
12. Slot availability
        |
13. Double-booking protection
        |
14. Slot holding
        |
15. Razorpay test integration
        |
16. Payment verification
        |
17. Webhooks
        |
18. Booking confirmation
        |
19. Email notifications
        |
20. Django Admin
        |
21. Testing
        |
22. Security review
        |
23. Deployment
        |
24. Production Razorpay
        |
25. Domain launch
```

This order keeps the project manageable and avoids trying to build the entire system at once.

---

# 56. Final Technology Decision

The final stack is:

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| HTTP Client | Axios |
| Routing | React Router |
| Backend | Python + Django |
| API | Django REST Framework |
| Database | PostgreSQL |
| Payment | Razorpay |
| Email | Django Email / transactional email provider |
| Admin | Django Admin |
| Frontend Hosting | Vercel |
| Backend Hosting | Render / Railway initially |
| Version Control | Git + GitHub |

**This should be the master implementation document for the House of Astrology project.**

The design reference should be kept alongside this document and used as the visual source of truth during frontend implementation.
