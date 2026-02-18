/**
 * CONE - Archivo de Configuración
 * Copia este archivo a config.js y rellena tus valores
 */

// ========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ========================================

// URL del Google Apps Script
// Obtén esto ejecutando el deploy en Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

// ========================================
// CONFIGURACIÓN DE SEGURIDAD
// ========================================

// Contraseña para acceder a la aplicación
const APP_PASSWORD = "bejerman23+";

// ========================================
// CONFIGURACIÓN DE TEMA
// ========================================

// Tema por defecto: 'light', 'medium', 'dark'
const DEFAULT_THEME = 'light';

// ========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ========================================

// Nombres de las hojas necesarias
const SHEET_NAMES = {
  general: "General",
  proyectos: "Proyectos",
  tareas: "Tareas",
  tareasDetalle: "TareasDetalle"
};

// ========================================
// CONFIGURACIÓN DE TIMEOUT
// ========================================

// Tiempo máximo de espera para sincronizar (ms)
const SYNC_TIMEOUT = 10000;

// ========================================
// CONFIGURACIÓN DE FUTURO (Firebase)
// ========================================

// const FIREBASE_CONFIG = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
