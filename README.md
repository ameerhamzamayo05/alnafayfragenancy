# Al-Nafay Fragency - Perfume E-Commerce Website

A beautiful and functional e-commerce website for selling premium perfumes with an admin panel.

## Features

✨ **Customer Features:**
- Browse perfume collection
- Product details and pricing
- Beautiful responsive design
- Mobile-friendly interface

🔐 **Admin Features:**
- Secure admin login
- Add new products
- Edit existing products
- Delete products
- Product management dashboard

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing

## Installation

### 1. Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 2. Clone and Setup
```bash
cd alnafayfragenancy
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
JWT_SECRET=your_secret_key_here_change_in_production
ADMIN_EMAIL=admin@alnafayfragenancy.com
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### 4. Run the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Project Structure

```
alnafayfragenancy/
├── public/
│   ├── index.html          # Main website
│   ├── admin.html          # Admin dashboard
│   ├── admin-login.html    # Admin login page
│   ├── app.js              # Frontend JavaScript
│   ├── admin.js            # Admin dashboard JavaScript
│   └── style.css           # Website styles
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── products.js         # Product routes
│   └── admin.js            # Admin routes
├── server.js               # Main server file
├── package.json            # Dependencies
└── README.md              # Documentation
```

## API Endpoints

### Public API
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Admin API (Requires Authentication)
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Add new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## Default Admin Credentials

- **Email:** admin@alnafayfragenancy.com
- **Password:** admin123

⚠️ **Important:** Change these credentials in production!

## Usage

### For Customers:
1. Visit `http://localhost:5000`
2. Browse products
3. Click "Add to Cart" (feature under development)

### For Admin:
1. Visit `http://localhost:5000/admin/login`
2. Login with default credentials
3. Manage products from the dashboard

## Deployment on Netlify

### Steps:
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm install`
4. Set publish directory: `public`
5. Add environment variables in Netlify settings
6. Deploy!

For backend hosting, consider using:
- Heroku
- Railway
- Render
- DigitalOcean

## Future Features

- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Payment gateway integration
- [ ] User registration and accounts
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Email notifications
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Search and filtering

## Security Notes

- Change default admin credentials immediately
- Use strong JWT_SECRET in production
- Enable HTTPS on production
- Implement rate limiting
- Add CSRF protection
- Sanitize user inputs
- Use environment variables for sensitive data

## Troubleshooting

### Port already in use
```bash
lsof -i :5000
kill -9 <PID>
```

### Module not found
```bash
rm -rf node_modules
npm install
```

### Authentication error
- Clear browser cache and cookies
- Check if token is stored in localStorage
- Verify JWT_SECRET is consistent

## Contributing

Feel free to fork, improve, and submit pull requests!

## License

MIT License - feel free to use this project for commercial or personal use.

## Support

For issues and questions, create an issue on GitHub.

---

**Made with ❤️ for Al-Nafay Fragency**