# 🔧 Guía de Configuración

## Requisitos Previos

- Node.js 14+ instalado
- Cuenta de Google con acceso a Google Sheets
- Google Apps Script habilitado
- VS Code (recomendado)

## Paso 1: Clonar el Proyecto

```bash
git clone https://github.com/tuusuario/cone-proyecto.git
cd cone-proyecto
```

O descargar como ZIP y extraer.

## Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará `http-server` para un servidor local.

## Paso 3: Configurar Google Sheets

### 3.1 Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo llamada "CONE"
3. Renombra la pestaña "Hoja1" a "Horas"

### 3.2 Crear las hojas necesarias

Crea las siguientes pestañas:

#### **Hoja: Horas**
Columnas:
- A: ID
- B: Fecha
- C: Proyecto
- D: Descripción
- E: Horas Normales
- F: Horas Abonadas
- G: Horas AMV

#### **Hoja: Proyectos**
Columnas:
- A: ID
- B: Nombre
- C: Cliente
- D: Estado
- E: Fecha Creación

#### **Hoja: Tareas**
Columnas:
- A: ID
- B: Nombre
- C: Fecha Creación
- D: Estado

#### **Hoja: TareasDetalle**
Columnas:
- A: ID
- B: ID Lista
- C: Descripción
- D: Prioridad (rojo/amarillo/verde)
- E: Completada (TRUE/FALSE)
- F: Fecha Creación

### 3.3 Configurar Google Apps Script

1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Reemplaza el código con el contenido de `google-sheets-script.gs`
3. Haz clic en **Implementar > Implementación nueva**
4. Selecciona **Ejecutable web**
5. Autoriza el acceso
6. Copia la URL que te genera

### 3.4 Actualizar la URL en el HTML

En `index.html`, busca la línea:

```javascript
const SCRIPT_URL = "TU_URL_AQUI";
```

Pega la URL de Google Apps Script que copiaste.

## Paso 4: Iniciar el Servidor

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:8080`

## Paso 5: Abrir en VS Code

```bash
code .
```

O arrastra la carpeta del proyecto a VS Code.

## ✅ Verificar Configuración

1. Abre `http://localhost:8080` en tu navegador
2. Ingresa contraseña: `bejerman23+`
3. Verifica que aparezcan los datos de Google Sheets
4. Intenta crear una hora de prueba
5. Recarga y verifica que se guardó en Google Sheets

## 🐛 Solucionar Problemas

### "Error al conectar a Google Sheets"

- [ ] Verifica que la URL de SCRIPT_URL sea correcta
- [ ] Asegúrate de tener las hojas con los nombres exactos
- [ ] Comprueba que autorizaste Google Apps Script

### "Los datos no se sincronizan"

- [ ] Abre la consola (F12) y revisa los logs
- [ ] Verifica que SCRIPT_URL esté actualizada
- [ ] Prueba en una pestaña nueva (sin caché)
- [ ] Abre los logs de Google Apps Script (Ejecuciones)

### "Botones no funcionan"

- [ ] Abre la consola (F12 > Consola)
- [ ] Verifica si hay errores de JavaScript
- [ ] Limpia caché (Ctrl+Shift+Supr)

## 📱 Estructura de Carpetas

```
cone-proyecto/
├── index.html              # Archivo principal
├── google-sheets-script.gs # Script de Google Apps
├── package.json           # Config del proyecto
├── .gitignore            # Archivos ignorados
├── docs/
│   ├── SETUP.md          # Esta guía
│   ├── API.md
│   └── CHANGELOG.md
└── node_modules/         # Dependencias (generado)
```

## 🚀 Próximos Pasos

1. **Migrar a Firebase** - Para mejor rendimiento
2. **Crear rama develop** - Para desarrollo
3. **Configurar GitHub** - Para versionado
4. **Crear CI/CD** - Para deployments automáticos

## 📖 Más Información

- [README principal](../README.md)
- [Documentación de API](./API.md)
- [Historial de cambios](./CHANGELOG.md)
