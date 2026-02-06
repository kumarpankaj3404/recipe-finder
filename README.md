# Recipe Finder

Recipe Finder is a modern React application that allows users to discover, browse, and save their favorite recipes. With a clean and responsive user interface, users can search for meals, explore by category, and view detailed cooking instructions.

## Features

-   **Search Recipes**: Find recipes by name or ingredient.
-   **Browse by Category**: Explore meals from various categories (e.g., Seafood, Vegan, Pasta).
-   **Recipe Details**: View comprehensive details including ingredients, measurements, and cooking instructions.
-   **Favorites**: Save your favorite recipes to a personalized list (requires login).
-   **User Authentication**: Secure login and signup functionality powered by Supabase.
-   **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

-   **Frontend**: React.js
-   **State Management**: Redux Toolkit
-   **Styling**: Tailwind CSS
-   **Backend / Auth**: Supabase
-   **Routing**: React Router
-   **Icons**: React Icons

## Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd recipe-finder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    REACT_APP_SUPABASE_URL=your_supabase_url
    REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    > Note: You need a Supabase project to get these keys.

4.  **Run the application**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Scripts

-   `npm start`: Runs the app in development mode.
-   `npm test`: Launches the test runner.
-   `npm run build`: Builds the app for production.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
