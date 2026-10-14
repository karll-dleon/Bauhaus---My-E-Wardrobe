# Bauhaus---My-E-Wardrobe

## Project Overview
* **Project Title:** Bauhaus: The E-Wardrobe (Bauhaus Functionalist Edition)  
* **Category:** Portfolio / Interactive Lifestyle Application  
* **Student Name:** Karl Andrew L. De Leon  
* **Section/Block:** INF242  

Bauhaus is an advanced, fully functional digital wardrobe management application built without a backend database. Inspired by Bauhaus design principles, it combines bold primary colors, geometric asymmetry, zero-border cards, and functionalist UI components to curate and track fashion pieces seamlessly.

---

## Main Features & Architecture
1. **Bauhaus-Inspired UI & Design System:** 
   * Strict adherence to a funky, bold color palette (Primary Red `#D71920`, Electric Blue `#005A9C`, Sunny Yellow `#FFD100`, Stark Black `#111111`, and Cream `#F4F2EC`).
   * Clean sans-serif typography and **zero borders** across all cards, utilizing hard geometric drop-shadow blocks instead.
2. **Secure Client-Side Authentication:** 
   * Custom login form equipped with real-time input validation, error handling, and local session persistence via the Local Storage API.
3. **Interactive Wardrobe Closet:** 
   * A simulated wooden cabinet that houses your uploaded clothing pieces. Clicking any item opens an inspection modal displaying its photo and detailed metadata (category, color, season, and addition date) with a quick-discard option.
4. **Device Image Upload (`FileReader` API):** 
   * Seamlessly upload real clothing photos directly from your device storage, encoding them into base64 strings saved locally.
5. **Extended Dashboard Analytics (KPIs):** 
   * Real-time metrics tracking Total Pieces, Top Category, Primary Season, and Collection Utilization Score.
6. **Weather-Integrated Style Suggester & 360° Mannequin:** 
   * Combines user-specified event parameters (Occasion & Place) with live meteorological data fetched asynchronously from the Open-Meteo API.
   * Dynamically maps a complete head-to-toe fit (tops/layers, bottoms, shoes) onto an interactive **360° rotating CSS/JS mannequin figure** complete with arms and non-overlapping text overlays.
7. **Stylist Profile & System Management:** 
   * Displays active session details, archetype metadata, and includes a full data wipe/reset utility for local storage.

---

## Technologies Used
* **HTML5:** Semantic markup structure.
* **CSS3:** Custom Bauhaus layout system, flexbox/grid architecture, 360° transform properties, and background image styling.
* **Vanilla JavaScript (ES6+):** 
  * Object-Oriented Programming (OOP Classes for `WardrobeItem`).
  * Array methods (`.push()`, `.filter()`, `.map()`, sorting algorithms).
  * DOM Manipulation & Event Handling (Event delegation/bubbling).
  * Asynchronous JavaScript (`async/await`, `fetch()`, `FileReader`).
  * Local Storage API data management.
* **Visual Studio Code:** Developed and tested locally via **Live Server**.

---

## How to Run in Visual Studio Code (Step-by-Step Procedure)
1. Ensure you have **Visual Studio Code** installed on your machine.
2. Install the **Live Server** extension by Ritwick Dey from the VS Code Marketplace.
3. Download or clone this repository into a local folder. Ensure your project folder contains:
   * `index.html` (Login page)
   * `app.html` (Dashboard Single-Page Application)
   * `style.css` (Bauhaus design system stylesheet)
   * `auth.js` (Login validation logic)
   * `wardrobe.js` (Core application logic, OOP, Fetch API, and DOM manager)
   * `auth_bg.jpg` (The geometric Bauhaus background image for the login screen)
4. Open the project folder in VS Code via **File > Open Folder**.
5. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
6. Enter your stylist alias and access code to unlock the Bauhaus studio workspace!
