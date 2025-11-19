# Device Sandbox Simulator

Drag-and-drop a **Light** or **Fan** onto a canvas, control them with real-time visuals, and **save/load presets** backed by a Laravel + MySQL API.

---

## Table of Contents

- [✨ Features](#-features)
- [🧱 Tech Stack](#-tech-stack)
- [📂 Folder Structure](#-folder-structure)
- [🖥️ Server Environment Setup (Local)](#️-server-environment-setup-local)
- [📥 Installation Guide](#-installation-guide)
  - [0) Get the code](#0-get-the-code)
  - [1) Backend (Laravel API)](#1-backend-laravel-api)
  - [2) Frontend (React app)](#2-frontend-react-app)
  - [3) Configure CORS (Laravel)](#3-configure-cors-laravel)
- [🔌 API Reference (summary)](#-api-reference-summary)
- [🧭 Using the App](#-using-the-app)
- [🐛 Troubleshooting](#-troubleshooting)

---

## ✨ Features

- **Drag & Drop UI**: Devices in the sidebar → drop into the **Testing Canvas**.
- **Device Controls**
  - **Light**: power toggle, color temperature (warm/neutral/cool/pink), brightness (0–100) with live glow.
  - **Fan**: power toggle, speed (0–100) with live spin animation.
- **Presets**
  - Save current device configuration as a **named preset** (DB).
  - List/Load/Delete presets from the sidebar.
- **Persistence**
  - Current device: in `localStorage` (survives refresh).
  - Presets: stored in **MySQL** via the Laravel API.
- **Clean code**: React Context (with reducer for device), modular components, Tailwind styling.

---

## 🧱 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React DnD, Axios
- **Backend**: Laravel (PHP 8.2+), MySQL 8+
- **State**: React Context (+ reducer for current device settings)
- **API**: REST (JSON), CORS enabled

---

## 📂 Folder Structure

```
device-sandbox-simulator/
├─ frontend/                # React app (Vite + Tailwind + React DnD)
│  ├─ src/
│  │  ├─ components/        # Canvas, Sidebar, Header, SavePresetModal, device UIs
│  │  ├─ contexts/          # CurrentDeviceContext, PresetsContext, etc.
│  │  ├─ data/              # static list of colors
│  │  ├─ hooks/             # Custom hooks
│  │  ├─ Layout/            # Components for layout
│  │  ├─ services/          # api.js for api calls
│  │  └─ main.jsx / App.jsx
│  └─ index.html, tailwind config, etc.
│
│
│
└─ backend/                 # Laravel API
   ├─ app/
   │  ├─ Http/Controllers/Api/   # PresetController, DeviceController
   │  └─ Models/                 # Preset, Device
   ├─ database/migrations/       # devices + presets (devices inserted by migration)
   ├─ routes/api.php
   └─ config/cors.php
```

> **Schema (2 tables)**
>
> - `devices`: fixed catalog rows (`light`, `fan`) inserted by migration.
> - `presets`: a single device configuration per row (`name`, `type` or `device_id`, `settings JSON`).

<br>

> **Note**: In this implementation, `devices` are fixed (Light/Fan) and inserted directly in a migration. Presets capture **one device** per row (name, type/device, settings JSON).

---

## 🖥️ Server Environment Setup (Local)

Choose one of the following stacks to run PHP (Laravel) and MySQL locally:

### Option A) **Laragon** (Windows - recommended)

1. Download: https://laragon.org/download/
2. Install and launch **Laragon**.
3. Click **Start All** to run **Apache** and **MySQL**.
4. PHP/Composer are bundled. If Composer is missing, install from https://getcomposer.org

### Option B) **XAMPP** (Windows/macOS/Linux)

1. Download: https://www.apachefriends.org/download.html
2. Start **Apache** and **MySQL** from the XAMPP Control Panel.
3. Make sure PHP ≥ 8.2 (check with `php -v`). If lower, install a newer PHP or use Laragon/WAMP.

### Option C) **WAMP** (Windows)

1. Download: https://www.wampserver.com/en/
2. Start **Apache**/**MySQL** services.
3. Ensure PHP ≥ 8.2 or switch to a package that supports it.

> After starting your stack, confirm:
>
> - `http://localhost` or `http://127.0.0.1` is reachable.
> - **phpMyAdmin** is available (usually `http://localhost/phpmyadmin`) to manage databases.

**Composer** (if not included by your stack): https://getcomposer.org/download/

## 📥 Installation Guide

### 0) Get the code

**Clone this repo (recommended):**

```bash
git clone https://github.com/aynoncse/device-sandbox-simulator.git
cd device-sandbox-simulator
```

Or download ZIP from GitHub and unzip.

- If you downloaded a ZIP, **unzip** it.
- Place the project in your **local server** workspace.

---

### 1) Backend (Laravel API)

1. Open a terminal in the **backend** folder (verify the path is correct).
2. Install dependencies:
   ```bash
   composer update
   ```
3. Create `.env`:
   - Copy `.env.example` → `.env`, or create a new `.env` and paste the template from the repo.
4. Configure database in `.env`:
   ```env
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   ```
5. Generate app key:
   ```bash
   php artisan key:generate
   ```
6. Run migrations:

   ```bash
   php artisan migrate
   ```

   - If the database doesn't exist, you may be prompted to create it automatically—type **yes** to confirm.

   #### Alternative DB setup (if migrations fail)

   - Open **phpMyAdmin** → select your database → **Import** → choose `database.sql` → **Go**.
   - Or run from terminal:

   ```bash
      mysql -u your_db_user -p your_db_name < database.sql
   ```

   - Ensure MySQL is running (start it via **XAMPP** or **Laragon** on Windows).

7. Start the API server:
   ```bash
   php artisan serve
   ```
8. Test the API:
   - Visit `http://127.0.0.1:8000/api/devices` in your browser or Postman—**a list of devices should display**.

✅ **Congrats!** Backend is running.

---

### 2) Frontend (React app)

1. Open a new terminal in the **frontend** folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` in `frontend/` and set your backend API URL:
   ```env
   VITE_API_URL="YOUR_BACKEND_URL/api"
   ```
   - Example (local):  
     `VITE_API_URL="http://127.0.0.1:8000/api"`
4. Start the dev server:
   ```bash
   npm run dev
   ```
   - Default Vite URL is `http://localhost:5173`.

---

### 3) Configure CORS (Laravel)

Open `backend/config/cors.php`, find **`'allowed_origins'`**, and add your frontend dev URL(s). Example:

```php
'allowed_origins' => ['http://localhost:5173', 'http://192.168.0.100:5173'],
```

After editing CORS:

```bash
php artisan config:clear
```

---

## 🔌 API Reference (summary)

### Devices

- `GET /api/devices` → returns fixed devices (`light`, `fan`).

### Presets

- `GET /api/presets` → list (paginated or array depending on controller)
- `POST /api/presets` → create
- `PUT /api/presets/{id}` → update name/settings
- `DELETE /api/presets/{id}` → delete

---

## 🧭 Using the App

1. Drag **Light** or **Fan** from the sidebar to the **Testing Canvas**.
2. Adjust settings with the controller panel.
3. Click **Save Preset**, give it a name → appears in **Saved Presets**.
4. Click or drag a preset to load it back.

## 🐛 Troubleshooting

- **CORS blocked** → Add your frontend origin to `config/cors.php`, then `php artisan config:clear`.
- **422 (validation error)** → Ensure payload matches device type fields (light vs fan).
- **500 (server error)** → Check `storage/logs/laravel.log`.
- **Frontend can’t reach API** → Confirm `VITE_API_URL` is correct and includes `/api`.

---
