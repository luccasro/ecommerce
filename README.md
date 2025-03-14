<h1 align="center">Ecommerce Project</h1>

### 🚧 Under Construction

---

We are currently working on exciting new features and improvements for this project. Stay tuned for updates, and feel free to check back soon!

### ➡️ Upcoming Improvements

- **Checkout Process 🔨**
- **Account Improvements 🔨**
- **Performance Optimization 🔨**
- **API Enhancements 🔨**
- **Product Catalog Expansion 🔨**

### 🔖 About

---

This project is a fake e-commerce web application built using Next.js, Prisma, and NextAuth. It provides a comprehensive platform for users to browse fake products, manage their shopping cart, wishlist, and user profiles, all with secure authentication and a seamless user experience. The project features dynamic product listings, filtering, user accounts, and smooth interactions, all using fake data.

The application architecture prioritizes scalability, reusability, and modern web technologies, leveraging server-side rendering (SSR) and static site generation (SSG) to optimize performance.

Built from scratch.

### 🌐 Demo

---

[View Web Demo](https://ecommerce.luccasdev.com)

### API Structure

---

```
└── 📁auth
        └── [...nextauth].ts          # Handles NextAuth.js authentication routes
    └── 📁bag
        └── add.ts                    # Adds items to the shopping bag
        └── delete.ts                 # Deletes items from the shopping bag
        └── index.ts                  # Retrieves the contents of the shopping bag
        └── update.ts                 # Updates items in the shopping bag
    └── 📁products
        └── [slug].ts                 # Retrieves product details based on the product id
        └── index.ts                  # Retrieves a list of products
    └── 📁user
        └── auth.ts                   # Handles user authentication
        └── create.ts                 # Creates a new user
        └── index.ts                  # Retrieves user details
        └── update.ts                 # Updates user details
        └── updatePassword.ts         # Updates user password
    └── 📁wishlist
        └── add.ts                    # Adds items to the wishlist
        └── delete.ts                 # Deletes items from the wishlist
        └── index.ts                  # Retrieves the contents of the wishlist
        └── update.ts                 # Updates items in the wishlist
```

### 🛠️ Technologies

---

This project was developed using the following technologies:

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## ✨ Getting started

### Prerequisites

- Node.js (Version: >=20.x)
- Yarn

### Development

```
# Clone the repository
$ git clone https://github.com/luccasro/ecommerce

# Install the dependencies
$ yarn install

# Create a .env file using .env.sample as a guide, and add your next auth and database details.

# Set up Prisma and the database
$ npx prisma generate
$ npx prisma migrate dev
$ npx prisma db seed

# Run on development server
$ yarn dev

# Build for production
$ yarn build

# Run on production server
$ yarn start
```

### 📝 License

---

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.

---

👩🏻‍💻 **Luccas Rodrigues**

[![Github Badge](https://img.shields.io/badge/-Github-242A2D?style=flat-square&logo=Github&logoColor=white&link=https://github.com/yourusername)](https://github.com/yourusername)
[![Linkedin Badge](https://img.shields.io/badge/-Linkedin-0077B5?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/yourlinkedin)](https://www.linkedin.com/in/yourlinkedin)
