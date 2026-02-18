# 📋 CONE - Control de Proyectos

Sistema integral de control de proyectos, gestión de tareas y registro de horas para CONE (Consultora de Negocios Empresarios).

## ✨ Características

- ⏱️ **Registro de Horas** - Trackear tiempo dedicado a proyectos
- 🚀 **Control de Proyectos** - Gestión de múltiples proyectos
- 📋 **Gestión de Tareas** - Listas de tareas con prioridades
- 📊 **Reportes** - Reportes de horas, proyectos y AMV
- 🎨 **Temas** - 3 modos de visualización (Claro, Medio, Oscuro)
- 📱 **Responsive** - Funciona en desktop y mobile
- 🔄 **Sincronización** - Datos en tiempo real con Google Sheets

## 📁 Estructura del Proyecto

```
cone-proyecto/
├── index.html                    # Archivo principal (renombrar de cone-control-proyectos.html)
├── google-sheets-script.gs       # Script de Google Apps Script
├── package.json                  # Configuración del proyecto
├── README.md                     # Este archivo
├── .gitignore                    # Archivos a ignorar en Git
├── docs/                         # Documentación
│   ├── SETUP.md                  # Guía de configuración
│   ├── API.md                    # Documentación de API
│   └── CHANGELOG.md              # Historial de cambios
├── src/                          # Código fuente (futuro)
│   ├── js/
│   └── css/
└── public/                       # Archivos públicos
    └── assets/
```

## 🚀 Instalación

### Requisitos
- Node.js 14+ ([Descargar](https://nodejs.org))
- Google Chrome, Firefox o Edge
- Cuenta de Google (para Google Sheets)

### Pasos

1. **Clonar o descargar el proyecto**
```bash
git clone https://github.com/tuusuario/cone-proyecto.git
cd cone-proyecto
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor local**
```bash
npm start
```

4. **Abrir en navegador**
```
http://localhost:8080
```

## 🔐 Contraseña de Acceso

```
bejerman23+
```

## 📚 Documentación

- **[SETUP.md](./docs/SETUP.md)** - Configuración inicial y conexión a Google Sheets
- **[API.md](./docs/API.md)** - Documentación de funciones y APIs
- **[CHANGELOG.md](./docs/CHANGELOG.md)** - Historial de versiones

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Google Apps Script
- **Base de datos**: Google Sheets (actual), Firebase (próximamente)
- **Control de versiones**: Git
- **Herramientas**: VS Code, Node.js

## 📝 Funcionalidades Principales

### 1. Registro de Horas
- Registro de horas diarias por proyecto
- Categorización: Normal, Abonado, AMV
- Vista de calendario interactivo
- Filtros por fecha, proyecto

### 2. Control de Proyectos
- Crear y editar proyectos
- Estado del proyecto (Activo, Completado)
- Asociación con clientes
- Seguimiento de horas por proyecto

### 3. Gestión de Tareas
- Crear listas de tareas
- Prioridades con semáforo (Rojo, Amarillo, Verde)
- Marcar como completadas
- Vista colapsable de tareas completadas
- Prioridad automática por antigüedad (>5 días)

### 4. Reportes
- **Reporte de Horas** - Por proyecto, cliente, fecha
- **Reporte de Proyectos** - Resumen general
- **Reporte de AMV** - Análisis de adicionales
- Exportación a PDF

## 🔄 Sincronización

Los datos se sincronizan automáticamente con Google Sheets mediante Google Apps Script:

**Hojas necesarias:**
- `Horas` - Registro de horas
- `Proyectos` - Lista de proyectos
- `Tareas` - Lista de tareas
- `TareasDetalle` - Detalle de tareas

## 🎨 Temas Disponibles

- ☀️ **Claro** - Interfaz clara para uso diurno
- 🌤️ **Medio** - Tono neutro
- 🌙 **Oscuro** - Para uso nocturno

## 📊 Reportes Disponibles

1. **Reporte de Horas** - Horas trabajadas por período
2. **Reporte de Proyectos** - Desglose por proyecto
3. **Reporte de AMV** - Análisis de adicionales

## 🐛 Problemas Conocidos

- La sincronización puede tardar 2-3 segundos
- Google Sheets tiene límites de 500 solicitudes/100 segundos

## 🚀 Próximas Mejoras

- [ ] Migración a Firebase Realtime Database
- [ ] Autenticación con Google OAuth
- [ ] Exportación a Excel
- [ ] Notificaciones push
- [ ] Aplicación móvil nativa
- [ ] Integración con Slack
- [ ] Análisis de productividad

## 📞 Contacto y Soporte

Para reportar bugs o solicitar features:
- Email: soporte@cone.com
- Issues: GitHub Issues

## 📄 Licencia

MIT © 2024 CONE

## 👨‍💻 Desarrollo

### Estructura de ramas Git
- `main` - Rama de producción
- `develop` - Rama de desarrollo
- `feature/*` - Nuevas características

### Commits
Usar formato convencional:
```
feat: Nueva característica
fix: Corrección de bug
docs: Documentación
style: Estilos
refactor: Refactorización
```

---

**Versión:** 2.0.0  
**Última actualización:** Febrero 2025
