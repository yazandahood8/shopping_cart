# Shopping Cart

![Project Demo]([https://via.placeholder.com/800x400?text=Demo+Preview](https://github.com/yazandahood8/shopping_cart/blob/main/v.mp4))  
Replace with actual demo GIF/video

A full-stack e-commerce application with Angular frontend, Node.js/Express backend, and MongoDB database. Implements user authentication, product catalog, and shopping cart functionality.

## ✨ Features

### Frontend (Angular)
- 🔒 JWT Authentication: Login, Signup, Logout
- 🛡 AuthGuard: Protected routes for authenticated users
- 🛒 Shopping Cart: Add/remove items, view total
- 📦 Product Catalog: Display products with images and prices
- 🚀 Responsive UI: Built with Angular Material
- 📱 Mobile-Friendly Design

### Backend (Node.js/Express)
- 🔑 JWT Token Management
- 🗄 MongoDB Integration: Mongoose models for Users, Products, Carts
- 📡 RESTful API:
  - User authentication (/api/auth)
  - Product management (/api/products)
  - Cart operations (/api/cart)
- 🔒 Security: Password hashing with bcrypt, CORS configuration
- 🛠 Middleware: Error handling, request validation

## 🛠 Tech Stack

*Frontend*:
- Angular 17+
- TypeScript
- RxJS
- Angular Material UI

*Backend*:
- Node.js 18+
- Express.js
- MongoDB/Mongoose
- JWT
- Bcrypt

*Tools*:
- MongoDB Atlas (Cloud Database)
- Postman (API Testing)
- GitHub (Version Control)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Angular CLI (npm install -g @angular/cli)
- MongoDB Atlas account or local MongoDB instance

### Installation

#### 1. Clone the repository:
bash
git clone https://github.com/yazandahood8/shopping_cart.git
cd shopping_cart


#### 2. Backend Setup:
bash
cd backend
npm install


#### 3. Frontend Setup:
bash
cd ../frontend
npm install


### Configuration

#### Backend (Create .env file in /backend):
env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=3000


#### Frontend (Update src/environments/environment.ts):
typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Backend API URL
};


### Running the Application

#### Start Backend Server:
bash
cd backend
npm start

Server runs on http://localhost:3000

#### Start Frontend:
bash
cd frontend
ng serve

Access UI at http://localhost:4200

---

## 📚 API Documentation

### Authentication Endpoints
| Endpoint            | Method | Description              | Request Body                |
|---------------------|--------|--------------------------|-----------------------------|
| /api/users/signup | POST   | Register new user       | { name, email, password } |
| /api/users/signin  | POST   | Login existing user     | { email, password }       |
| /api/users/signin/:userId  | POST   | getUser     |       |


### Product Endpoints
| Endpoint         | Method | Description              |
|-----------------|--------|--------------------------|
| /api/products/getProducts | GET    | Get all products         |
| /api/products/add   | POST   | Add item to products        | { productId, quantity, image , price , quintity }  |

| /api/products/:id | GET  | Get single product by ID |

### Cart Endpoints
| Endpoint       | Method | Description              | Request Body               |
|---------------|--------|--------------------------|----------------------------|
| /api/cart   | GET    | Get user's cart         | Requires JWT token        |
| /api/addToCart   | POST   | Add item to cart        | { productId, quantity }  |
| /api/removeFromCart/| DELETE | Remove item from cart   | { productId, quantity,email }        |

---

## 🧪 Testing

#### Backend (using Jest):
bash
cd backend
npm test


#### Frontend (Angular tests):
bash
cd frontend
ng test


---

## 🌐 Deployment

### Backend:
- Deploy to *Render* or *Heroku*
- Use *MongoDB Atlas* for cloud database

### Frontend:
- Build with ng build --production
- Deploy to *Vercel* or *Firebase Hosting*

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
bash
git checkout -b feature/your-feature

3. Commit changes:
bash
git commit -m 'Add awesome feature'

4. Push to branch:
bash
git push origin feature/your-feature

5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See LICENSE for details.

---

## 🙏 Acknowledgments
- *Angular Documentation*
- *MongoDB Atlas*
- *JWT.io* for authentication
- *Stack Overflow Community*
