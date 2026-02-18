# 📚 Documentación de API

## Endpoints de Google Apps Script

### doGet()
Obtiene todos los datos: horas, proyectos y tareas

**Respuesta:**
```json
{
  "horas": [...],
  "proyectos": [...],
  "listas": [...]
}
```

---

## POST Endpoints

### Tareas

#### save_list
Crea una nueva lista de tareas

**Payload:**
```json
{
  "action": "save_list",
  "nombre": "Mi Lista"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Lista Creada"
}
```

---

#### save_task
Crea una nueva tarea en una lista

**Payload:**
```json
{
  "action": "save_task",
  "listaId": "1234567890",
  "descripcion": "Hacer algo",
  "prioridad": "rojo|amarillo|verde"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Tarea Creada"
}
```

---

#### get_tasks
Obtiene todas las tareas de una lista

**Payload:**
```json
{
  "action": "get_tasks",
  "listaId": "1234567890"
}
```

**Respuesta:**
```json
{
  "tasks": [
    {
      "id": 1770838010684,
      "listaId": "1234567890",
      "descripcion": "Hacer algo",
      "prioridad": "rojo",
      "completada": false,
      "fechaCreacion": "11/2/2025 16:29:34"
    }
  ]
}
```

---

#### update_task
Actualiza una tarea (completar, cambiar prioridad, etc)

**Payload:**
```json
{
  "action": "update_task",
  "id": "1770838010684",
  "completada": true,
  "prioridad": "amarillo",
  "descripcion": "Nuevo texto"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Tarea Actualizada"
}
```

---

#### delete_task
Elimina una tarea

**Payload:**
```json
{
  "action": "delete_task",
  "id": "1770838010684"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Tarea Eliminada"
}
```

---

#### update_list
Actualiza el nombre de una lista

**Payload:**
```json
{
  "action": "update_list",
  "id": "1234567890",
  "nombre": "Nuevo nombre"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Lista Actualizada"
}
```

---

### Proyectos

#### save_project
Crea un nuevo proyecto

**Payload:**
```json
{
  "action": "save_project",
  "client": "Acme Corp",
  "hoursRemote": 40,
  "hoursOnSite": 20,
  "deliveryDate": "2025-03-15",
  "description": "Descripción del proyecto"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Proyecto Creado"
}
```

---

### Horas

#### Crear hora
Crea un nuevo registro de horas

**Payload:**
```json
{
  "date": "2025-02-18",
  "client": "Cliente",
  "hours": 8,
  "type": "Remoto|Presencial",
  "requester": "Solicitante",
  "description": "Descripción",
  "consultor": "Nombre",
  "proyectoId": "123456"
}
```

**Respuesta:**
```json
{
  "success": true
}
```

---

#### edit
Edita un registro de horas

**Payload:**
```json
{
  "action": "edit",
  "id": "1234567890",
  "date": "2025-02-18",
  "client": "Cliente",
  "hours": 6,
  "type": "Remoto",
  "requester": "Solicitante",
  "description": "Descripción actualizada",
  "consultor": "Nombre",
  "proyectoId": "123456"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Editado"
}
```

---

#### delete
Elimina un registro de horas

**Payload:**
```json
{
  "action": "delete",
  "id": "1234567890"
}
```

**Respuesta:**
```json
{
  "success": true,
  "msg": "Eliminado"
}
```

---

## Funciones JavaScript Frontend

### loadData()
Carga todos los datos del servidor

```javascript
loadData();
```

---

### saveTarea(event)
Guarda una nueva tarea

```javascript
saveTarea(event);
```

---

### completarTarea(tareaId)
Marca una tarea como completada

```javascript
completarTarea('1770838010684');
```

---

### descompletarTarea(tareaId)
Marca una tarea como pendiente

```javascript
descompletarTarea('1770838010684');
```

---

### deleteTarea(tareaId)
Elimina una tarea

```javascript
deleteTarea('1770838010684');
```

---

### editList(listaId)
Edita el nombre de una lista

```javascript
editList('1234567890');
```

---

### createList()
Crea una nueva lista

```javascript
createList();
```

---

### selectList(listaId)
Selecciona una lista para ver sus tareas

```javascript
selectList('1234567890');
```

---

## Estructura de Datos

### Hora
```javascript
{
  id: 1234567890,
  fecha: "2025-02-18",
  cliente: "Acme Corp",
  horas: 8,
  tipo: "Remoto",
  solicitante: "Juan",
  descripcion: "Trabajo realizado",
  consultor: "Pedro",
  proyectoId: "123456"
}
```

### Proyecto
```javascript
{
  id: 1234567890,
  fechaCreacion: "2025-02-18",
  cliente: "Acme Corp",
  horasRemotasPresupuestadas: 40,
  horasPresencialesPresupuestadas: 20,
  fechaEntrega: "2025-03-15",
  descripcion: "Descripción",
  estado: "Pendiente"
}
```

### Lista de Tareas
```javascript
{
  id: "1234567890",
  nombre: "Mi Lista",
  fechaCreacion: "11/2/2025 16:29:34",
  estado: "Activa"
}
```

### Tarea
```javascript
{
  id: 1770838010684,
  listaId: "1234567890",
  descripcion: "Hacer algo",
  prioridad: "rojo|amarillo|verde",
  completada: false,
  fechaCreacion: "11/2/2025 16:29:34"
}
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| `{success: false, error: "..."}` | Error en la operación |
| HTTP 500 | Error en Google Apps Script |
| Network Error | No hay conexión a servidor |

---

## Notas de Implementación

### Prioridades de Tareas
- `rojo` - Alta (🔴)
- `amarillo` - Media (🟡)
- `verde` - Baja (🟢)

### Estados de Proyecto
- `Pendiente` - Aún no iniciado
- `En Progreso` - En desarrollo
- `Completado` - Finalizado

### Tipos de Horas
- `Remoto` - Trabajo desde casa
- `Presencial` - Trabajo en oficina
- `AMV` - Adicionales y Movidas

---

## Rate Limits

- Google Sheets: 500 solicitudes/100 segundos
- Recomendado: Máximo 10 solicitudes/segundo desde frontend

---

**Última actualización:** Febrero 2025
