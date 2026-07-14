# Product Requirement Document (PRD): GiziLog Specification
**Version:** 1.0  
**Target Platform:** Mobile-First Web Application (Responsive Desktop)  
**Tech Stack:** React.js, Axios, Recharts, React-Webcam  
**Target Backend/AI:** OpenClaw API Gateway (Vision Model)

---

## 1. Product Overview & Core Objective
GiziLog adalah aplikasi pelacak nutrisi harian pintar yang berfokus pada pencegahan malnutrisi dan stunting. Fitur utamanya adalah kemampuan memindai makanan secara real-time menggunakan kamera, mengirimkannya ke AI OpenClaw untuk dianalisis kandungan gizinya (Kalori, Protein, Lemak, Karbohidrat), dan menyajikannya secara visual terukur kepada pengguna.

---

## 2. Technical Stack Requirements
*   **Frontend Framework:** React.js (Vite bundler recommended for performance).
*   **Camera Library:** `react-webcam` (Must support back-camera stream and Base64 capture).
*   **HTTP Client:** `axios` (For structured API handling and error state interceptors).
*   **Data Visualization:** `recharts` (For lightweight, responsive canvas rendering of nutrition charts).
*   **Deployment Target:** Vercel (Requires HTTPS for MediaDevices API permissions).

---

## 3. Detailed Feature Specifications

### FEAT-01: Authentication & Onboarding
*   **Login Page:** Email and Password authentication inputs.
*   **Register Page:** Setup fields for Name, Email, Password, and Physical Profile Metadata (Weight, Height, Age, Activity Level) to calculate personalized daily calorie targets.

### FEAT-02: AI Food Object Scanner (Core Feature)
*   **Component Requirement:** Implement `react-webcam` with `videoConstraints={{ facingMode: "environment" }}` to enforce hardware rear-camera invocation on mobile devices.
*   **Capture Mechanism:** 
    *   Trigger `getScreenshot()` to capture a JPEG frame.
    *   Extract the raw Base64 string by stripping the Data URL prefix (`data:image/jpeg;base64,`).
*   **API Payload Structure (OpenClaw Request):**
    *   **Method:** `POST`
    *   **Endpoint:** Configured via `import.meta.env.VITE_OPENCLAW_API_URL`
    *   **Headers:** `Content-Type: application/json`, `Authorization: Bearer [TOKEN]`
    *   **Payload Schema:**
        ```json
        {
          "model": "gpt-4o",
          "image_data": "BASE64_STRING_HERE",
          "prompt": "Identify the food item from the image. Provide estimates for: food_name, calories (kcal), protein (g), fat (g), and carbohydrates (g). Respond strictly in a valid minified JSON object with keys: food_name, calories, protein, fat, carbs."
        }
        ```
*   **Fallback Handling:** If the AI response fails or confidence score is low, expose a "Bukan ini? / Manual Adjust" toggle allowing the user to select fallback items or manually input values.

### FEAT-03: Sekat Piring Makan & Jurnal Log
*   **Data Transformation:** Parse JSON from OpenClaw response into localized state.
*   **Visual Representation:** Map macronutrients ratio into a Recharts Pie Chart.
*   **Threshold Warnings:** Evaluate sodium, fiber, and sugar limits against global WHO thresholds. Render explicit color warnings (Green = Safe, Yellow = Warning, Red = Danger).
*   **Journal Persistence:** Post accepted data array to the user's daily journal state (`Timeline Makan`) categorized into Breakfast, Lunch, Dinner, or Snacks.

### FEAT-04: Analytics Dashboard & Scalability
*   **Mobile View:** Render a compact daily ring gauge showing remaining calories out of the total allowance.
*   **Desktop View (`/dashboard-analytics`):** 
    *   Render a high-density analytics interface.
    *   Display synchronized multi-series Recharts Bar Charts tracking Weekly/Monthly macronutrient trends.
    *   Incorporate an AI-generated insight container (`Gizi Insight`) parsing text contextual feedback.

---

## 4. Security & Environment Constraints
*   **Strict Security Rule:** Never expose API Keys natively. All network triggers must bind keys from Environment Variables (`VITE_OPENCLAW_API_KEY`).
*   **CORS Mitigation:** If OpenClaw throws CORS headers errors, the developer must implement a Vercel Serverless Function under `/api/scan.js` acting as a secure downstream proxy request handler.
