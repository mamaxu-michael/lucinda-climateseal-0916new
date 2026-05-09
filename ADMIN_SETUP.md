# Admin Setup

## Local access

1. Add credentials to `.env.local`:

```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_strong_password
ADMIN_SESSION_SECRET=your_long_random_secret
```

2. Start the app:

```bash
npm run dev
```

3. Open:

`http://localhost:3000/admin/login`

## What the admin stores

- Contact form submissions: `data/admin/contact-submissions.json`
- Whitepaper requests: `data/admin/whitepaper-submissions.json`
- Uploaded asset records: `data/admin/uploaded-assets.json`
- Uploaded files: `public/uploads/admin`

## Production environment variables

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Deployment notes

- Keep admin routes behind strong credentials.
- Use a long random `ADMIN_SESSION_SECRET`.
- Uploaded files are stored on the app filesystem in this MVP. For long-term production, move uploads and submission data to persistent cloud storage or a database.
- Admin pages are marked `noindex`.
