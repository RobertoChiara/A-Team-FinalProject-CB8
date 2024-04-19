# NovaGaming - Game E-Commerce Store

Welcome to NovaGaming, the ultimate destination for all your gaming needs! NovaGaming is an e-commerce platform built using Next.js, MongoDB, and Mongoose. This project serves as the final project for Group A of the Edgemony Coding Bootcamp CB8 2023/2024.

## Features

- Browse a vast collection of games available for purchase.
- Add games to your Wishlist for easy tracks.
- Add games to your Cart for easy checkout.
- Finally get your own games in your Library.
- User authentication using custom middleware for secure access with Hashed password 256-bit.
- Integration with a third-party API for fetching game data.
- Responsive design with SCSS for a seamless experience across devices.

## Technologies Used

- **JavaScript**: JavaScript is chosen for both frontend and backend development due to its versatility and widespread support. It allows developers to write code for both client-side and server-side logic, enabling seamless integration between frontend and backend components.
- **Node.js**: Node.js is utilized as the runtime environment for the App backend development. It provides a scalable, event-driven architecture that allows for non-blocking I/O operations, making it well-suited for building fast and scalable network applications. Node.js enables developers to use JavaScript for server-side programming, offering a unified language and toolset for full-stack development.
- **Next.js**: Next.js is utilized in the App primarily for its server-side rendering capabilities and simplified React application setup. By enabling server-side rendering, Next.js enhances the performance and SEO-friendliness of the application, leading to faster page loads and better search engine visibility. Its intuitive setup also streamlines the development process, allowing developers to focus more on building features rather than configuring the project.
- **MongoDB**: MongoDB is employed as the database solution due to its flexibility, scalability, and support for NoSQL data models. As a NoSQL database, MongoDB provides the flexibility to store unstructured or semi-structured data, making it well-suited for storing user data, game information, and other dynamic content . Additionally, MongoDB's scalability ensures that the database can grow with the application's needs over time.
- **Mongoose**: Mongoose is integrated with MongoDB to provide an Object Data Modeling (ODM) solution for Node.js. Mongoose simplifies the interaction with MongoDB by providing a schema-based approach for defining data models and enforcing data validation. This helps maintain data integrity and consistency within the application, ensuring that the data stored in MongoDB aligns with the expected structure and rules defined by the application.
- **Express.js**: Express.js is chosen as the backend framework for its simplicity, flexibility, and robust feature set. Express.js allows developers to build web applications and APIs quickly and efficiently by providing a minimalist framework with powerful middleware support. Express.js likely serves as the backend framework responsible for handling HTTP requests, routing, middleware, and other backend logic.
- **Custom Middleware**: Custom middleware is implemented to enhance security and enforce authentication mechanisms for accessing protected routes. Middleware functions are used to intercept incoming requests, perform authentication checks, and grant or deny access based on the user's credentials or permissions. This helps secure sensitive endpoints and ensure that only authorized users can access certain features or data within the application.
- **JSON Web Token (JWT)**: JWT is utilized for securely transmitting information between parties as a JSON object. JWTs are commonly used for authentication and creating access tokens that grant users access to protected resources or endpoints. JWTs are likely used to authenticate users and generate access tokens, which are then included in subsequent requests to access restricted features or data.
- **bcrypt**: bcrypt is employed for securely hashing user passwords before storing them in the database. Password hashing is a fundamental security practice that helps protect user credentials from unauthorized access in the event of a data breach. By using bcrypt to hash passwords, NovaGaming ensures that user passwords are securely stored and resistant to brute-force attacks or other password cracking techniques.
- **SASS**: (SCSS) is utilized for styling the application's user interface. SCSS provides a powerful set of features for writing maintainable and scalable CSS code, including variables, nesting, mixins, and more. By using SCSS, developers can streamline the styling process, improve code organization, and maintain consistency across the application's UI components.

## Getting Started

To get started with NovaGaming locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database either locally or using a cloud service like MongoDB Atlas.
4. Create a `.env.local` file in the root directory and define the following environment variables: ACCESSTOKEN_SECRET= / DATABASE_URI= / NEXT_PUBLIC_API_KEY=
5. Run the development server using `npm run dev`.
6. Visit `http://localhost:3000` in your web browser to access NovaGaming in local.
7. Visit `a-team-final-project-cb-8.vercel.app` in your web browser to access NovaGaming Deployment.

## Contributing

Contributions to NovaGaming are welcome! If you have any ideas for features, enhancements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback regarding NovaGaming, please contact the project maintainers:

- Roberto Chiara - https://github.com/RobertoChiara
- Celeste Massaro - https://github.com/MCelesteMassaro
- Christian Schillaci - https://github.com/ChriSchillaci
- Andrea Torrisi - https://github.com/AndreaTorris
- Alex Venutelli - https://github.com/AlexVenutelli

## Acknowledgements

We would like to express our sincere gratitude to the following individuals who have played pivotal roles in the development and success of NovaGaming:

- **Giuseppe Senettone**: As our team leader, Giuseppe has been instrumental in guiding us through the project, inspiring us with ideas, and offering invaluable assistance whenever we encountered challenges.

- **Marco Guglielmino**: We extend our appreciation to Marco for serving as our mentor throughout the Edgemony Coding Bootcamp. His guidance, expertise, and encouragement have been invaluable in our learning journey.

- **Casimiro Ciancimino**: We are grateful to Casimiro for imparting his knowledge of coding and philosophy during the bootcamp. His teachings have greatly enriched our understanding and approach to software development.

Thank you, Giuseppe, Marco, and Casimiro, for your unwavering support, mentorship, and inspiration.

We are grateful for your assistance and encouragement throughout this journey.

Thank you for using NovaGaming!
