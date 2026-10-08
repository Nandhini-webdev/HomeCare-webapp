# HomeCare Pro — V3 UI + Full Features

A React + Tailwind CSS home-appliance customer service project with the original HomeCare Pro V3 visual direction and the latest requested functionality.

## Stack
- React + Vite
- Tailwind CSS
- React Router
- Axios
- JSON Server
- Clerk authentication
- Lucide React

## Run
```bash
npm install
```

Create `.env` next to `package.json`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
VITE_ADMIN_EMAIL=admin@homecare.com
```

Terminal 1:
```bash
npm run api
```

Terminal 2:
```bash
npm run dev
```

## Customer auth
- `/sign-up` — custom Clerk email + password signup with email-code verification when required.
- `/login` — custom Clerk email + password sign-in.
- `/bookings` — signed-in customer's own bookings.

The project uses the Clerk application selected in your `.env` publishable key. The user created through `/sign-up` should appear in that same Clerk Dashboard application's **Users** section.

## Admin
- `/admin/login` — separate admin login page.
- `/admin` — admin dashboard.
- Admin access is allowed when either:
  - Clerk public metadata has `{ "role": "admin" }`, or
  - the signed-in email matches `VITE_ADMIN_EMAIL`.

## API
JSON Server runs at `http://localhost:3000`:
- `GET /appliances`
- `GET /appliances/:id`
- `POST /bookings`
- `GET /bookings`
- `PATCH /bookings/:id`
- `DELETE /bookings/:id`
- `GET /contacts`
- `POST /contacts`

## Included features
- V3-inspired HomeCare Pro UI
- 8 appliance categories with original appliance images
- Other appliance + custom appliance name
- Other problem + custom issue description
- Smart Appliance Diagnosis
- Safe troubleshooting guidance
- Repair vs Replace Guide
- Appliance Health Score
- Transparent service estimate range
- Technician status tracking: Received → Assigned → On the way → Started → Completed
- Customer bookings/history
- Contact form validation + API storage
- Separate admin login/dashboard
- Admin booking status update/delete
- Admin contact-message view
- Responsive/mobile navigation
- Smooth scrolling

## Admin login setup
1. In Clerk Dashboard, open the **same Clerk application** whose `pk_test_...` key is in `.env`.
2. Create the admin user there using the email you want to use for the admin portal.
3. Set that email in `.env`:
   ```env
   VITE_ADMIN_EMAIL=your-admin-email@example.com
   ```
   **OR** assign this Clerk public metadata to the admin user:
   ```json
   {
     "role": "admin"
   }
   ```
4. Restart Vite after changing `.env`:
   ```bash
   Ctrl+C
   npm run dev
   ```
5. Open `/admin/login` and sign in with the configured admin account.

If a normal customer account is already signed in, the admin login page now shows a **Sign out & switch account** button instead of trapping you in the unauthorized page.
