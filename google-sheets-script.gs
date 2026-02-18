/**
 * CONE - Control de Proyectos - VERSIÓN CON ESTADOS MEJORADOS + TAREAS
 * Script para Google Sheets ACTUALIZADO
 */

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("General");
  const data = sheet.getDataRange().getValues();
  
  let horasData = [];
  if (data.length > 1) {
    horasData = data.slice(1).map(row => {
      let fechaTxt = "";
      try {
        if (row[1] instanceof Date) {
          fechaTxt = Utilities.formatDate(row[1], Session.getScriptTimeZone(), "yyyy-MM-dd");
        } else {
          fechaTxt = new Date(row[1]).toISOString().split('T')[0];
        }
      } catch(e) { fechaTxt = row[1] ? row[1].toString() : ""; }

      return {
        id: row[0],
        fecha: fechaTxt,
        cliente: row[2] ? row[2].toString().trim() : "",
        horas: parseFloat(row[3]) || 0,
        tipo: row[4] || "",
        solicitante: row[5] || "",
        descripcion: row[6] || "",
        consultor: row[7] || "",
        proyectoId: row[8] || ""
      };
    });
  }

  // Obtener proyectos
  let proyectosData = [];
  try {
    const sheetProyectos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Proyectos");
    if (sheetProyectos) {
      const dataProyectos = sheetProyectos.getDataRange().getValues();
      if (dataProyectos.length > 1) {
        proyectosData = dataProyectos.slice(1).map(row => {
          let fechaCreacion = "";
          let fechaEntrega = "";
          try {
            if (row[1] instanceof Date) {
              fechaCreacion = Utilities.formatDate(row[1], Session.getScriptTimeZone(), "yyyy-MM-dd");
            }
            if (row[5] instanceof Date) {
              fechaEntrega = Utilities.formatDate(row[5], Session.getScriptTimeZone(), "yyyy-MM-dd");
            }
          } catch(e) {}
          
          return {
            id: row[0],
            fechaCreacion: fechaCreacion,
            cliente: row[2] ? row[2].toString().trim() : "",
            horasRemotasPresupuestadas: parseFloat(row[3]) || 0,
            horasPresencialesPresupuestadas: parseFloat(row[4]) || 0,
            fechaEntrega: fechaEntrega,
            descripcion: row[6] || "",
            estado: row[7] || "Pendiente"
          };
        });
      }
    }
  } catch(e) {}

  // Obtener Listas de Tareas
  let listasData = [];
  try {
    const sheetListas = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tareas");
    if (sheetListas) {
      const dataListas = sheetListas.getDataRange().getValues();
      Logger.log("Datos de Tareas encontrados. Cantidad de filas:", dataListas.length);
      if (dataListas.length > 1) {
        listasData = dataListas.slice(1).map(row => {
          return {
            id: row[0] ? row[0].toString() : "",
            nombre: row[1] ? row[1].toString().trim() : "",
            fechaCreacion: row[2] ? row[2].toString() : "",
            estado: row[3] ? row[3].toString() : "Activa"
          };
        }).filter(l => l.id && l.nombre); // Filtrar listas vacías
      }
      Logger.log("Listas procesadas. Total:", listasData.length);
    } else {
      Logger.log("Hoja 'Tareas' no encontrada");
    }
  } catch(e) {
    Logger.log("Error al leer listas:", e.toString());
  }

  return ContentService.createTextOutput(JSON.stringify({
    horas: horasData,
    proyectos: proyectosData,
    listas: listasData
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const d = JSON.parse(e.postData.contents);
    const action = d.action; 

    // --- GUARDAR NUEVA LISTA DE TAREAS ---
    if (action === "save_list") {
      const sheetListas = ss.getSheetByName("Tareas");
      if (!sheetListas) throw new Error("Falta la hoja Tareas");
      
      sheetListas.appendRow([
        Date.now(),                          // A: ID
        d.nombre,                            // B: Nombre de la Lista
        new Date(),                          // C: Fecha de creación
        "Activa"                             // D: Estado
      ]);
      return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Lista Creada"})).setMimeType(ContentService.MimeType.JSON);
    }

    // --- GUARDAR NUEVA TAREA EN UNA LISTA ---
    if (action === "save_task") {
      const sheetTareas = ss.getSheetByName("TareasDetalle");
      if (!sheetTareas) throw new Error("Falta la hoja TareasDetalle");
      
      sheetTareas.appendRow([
        Date.now(),                          // A: ID
        d.listaId,                           // B: ID de la Lista
        d.descripcion,                       // C: Descripción
        d.prioridad || "verde",              // D: Prioridad (rojo, amarillo, verde)
        "FALSE",                             // E: Completada (FALSE por defecto como texto)
        new Date()                           // F: Fecha de creación
      ]);
      return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Tarea Creada"})).setMimeType(ContentService.MimeType.JSON);
    }

    // --- OBTENER TAREAS DE UNA LISTA ---
    if (action === "get_tasks") {
      const sheetTareas = ss.getSheetByName("TareasDetalle");
      if (!sheetTareas) return ContentService.createTextOutput(JSON.stringify({tasks: []})).setMimeType(ContentService.MimeType.JSON);
      
      const dataTareas = sheetTareas.getDataRange().getValues();
      Logger.log("Datos de TareasDetalle. Filas:", dataTareas.length);
      if (dataTareas.length > 0) {
        Logger.log("Primera fila (headers):", dataTareas[0]);
        Logger.log("Segunda fila (datos):", dataTareas[1]);
      }
      
      let tareas = [];
      
      if (dataTareas.length > 1) {
        tareas = dataTareas.slice(1)
          .filter(row => row[1].toString() === d.listaId.toString())
          .map((row, idx) => {
            Logger.log("Procesando fila " + idx + ":", row);
            const completadaValue = row[4] ? row[4].toString().toUpperCase() : "FALSE";
            Logger.log("Valor completada:", completadaValue);
            return {
              id: row[0],
              listaId: row[1],
              descripcion: row[2] || "",
              prioridad: row[3] || "verde",
              completada: completadaValue === "TRUE" || completadaValue === true,
              fechaCreacion: row[5] ? row[5].toString() : ""
            };
          });
      }
      
      Logger.log("Tareas procesadas:", tareas);
      return ContentService.createTextOutput(JSON.stringify({tasks: tareas})).setMimeType(ContentService.MimeType.JSON);
    }

    // --- ACTUALIZAR TAREA ---
    if (action === "update_task") {
      const sheetTareas = ss.getSheetByName("TareasDetalle");
      if (!sheetTareas) throw new Error("Falta la hoja TareasDetalle");
      
      const dataTareas = sheetTareas.getDataRange().getValues();
      Logger.log("Buscando tarea con ID:", d.id);
      Logger.log("Total de filas:", dataTareas.length);
      
      for (let i = 1; i < dataTareas.length; i++) {
        const idEnHoja = dataTareas[i][0] ? dataTareas[i][0].toString() : "";
        const idABuscar = d.id ? d.id.toString() : "";
        
        if (idEnHoja === idABuscar) {
          Logger.log("Tarea encontrada en fila:", i + 1);
          
          // Actualizar solo los campos que vienen en el payload
          if (d.descripcion !== undefined) {
            sheetTareas.getRange(i + 1, 3).setValue(d.descripcion);
            Logger.log("Descripción actualizada");
          }
          if (d.prioridad !== undefined) {
            sheetTareas.getRange(i + 1, 4).setValue(d.prioridad);
            Logger.log("Prioridad actualizada");
          }
          if (d.completada !== undefined) {
            // Guardar como "TRUE" o "FALSE" en texto para evitar problemas
            const completadaValue = d.completada === true || d.completada === "true" ? "TRUE" : "FALSE";
            sheetTareas.getRange(i + 1, 5).setValue(completadaValue);
            Logger.log("Completada actualizada a:", completadaValue);
          }
          
          return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Tarea Actualizada"})).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      Logger.log("Tarea NO encontrada");
      return ContentService.createTextOutput(JSON.stringify({success: false, error: "Tarea no encontrada"})).setMimeType(ContentService.MimeType.JSON);
    }

    // --- ACTUALIZAR LISTA ---
    if (action === "update_list") {
      const sheetListas = ss.getSheetByName("Tareas");
      if (!sheetListas) throw new Error("Falta la hoja Tareas");
      
      const dataListas = sheetListas.getDataRange().getValues();
      for (let i = 1; i < dataListas.length; i++) {
        if (dataListas[i][0].toString() === d.id.toString()) {
          sheetListas.getRange(i + 1, 2).setValue(d.nombre);
          return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Lista Actualizada"})).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // --- ELIMINAR TAREA ---
    if (action === "delete_task") {
      const sheetTareas = ss.getSheetByName("TareasDetalle");
      if (!sheetTareas) throw new Error("Falta la hoja TareasDetalle");
      
      const dataTareas = sheetTareas.getDataRange().getValues();
      for (let i = 1; i < dataTareas.length; i++) {
        if (dataTareas[i][0].toString() === d.id.toString()) {
          sheetTareas.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Tarea Eliminada"})).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // --- GUARDAR NUEVO PROYECTO ---
    if (action === "save_project") {
      const sheetProyectos = ss.getSheetByName("Proyectos");
      if (!sheetProyectos) throw new Error("Falta la hoja Proyectos");
      
      sheetProyectos.appendRow([
        Date.now(),                          // A: ID
        new Date(),                          // B: Fecha de creación (hoy)
        d.client,                            // C: Cliente
        parseFloat(d.hoursRemote) || 0,      // D: Horas Remotas Presupuestadas
        parseFloat(d.hoursOnSite) || 0,      // E: Horas Presenciales Presupuestadas
        d.deliveryDate,                      // F: Fecha Entrega
        d.description || "",                 // G: Descripción
        "Pendiente"                          // H: Estado inicial
      ]);
      return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Proyecto Creado"})).setMimeType(ContentService.MimeType.JSON);
    }

    // --- LÓGICA DE HORAS ---
    const sheet = ss.getSheetByName("General");

    if (action === "delete") {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0].toString() === d.id.toString()) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Eliminado"})).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    if (action === "edit") {
      const data = sheet.getDataRange().getValues();
      let registroEncontrado = false;
      
      for (let i = 1; i < data.length; i++) {
        const idEnHoja = data[i][0] ? data[i][0].toString().trim() : "";
        const idABuscar = d.id ? d.id.toString().trim() : "";
        
        if (idEnHoja === idABuscar && idEnHoja !== "") {
          registroEncontrado = true;
          
          // Actualizar la fila
          sheet.getRange(i + 1, 1).setValue(d.id);
          sheet.getRange(i + 1, 2).setValue(d.date);
          sheet.getRange(i + 1, 3).setValue(d.client);
          sheet.getRange(i + 1, 4).setValue(d.hours);
          sheet.getRange(i + 1, 5).setValue(d.type || "Remoto");
          sheet.getRange(i + 1, 6).setValue(d.requester);
          sheet.getRange(i + 1, 7).setValue(d.description);
          sheet.getRange(i + 1, 8).setValue(d.consultor || "");
          sheet.getRange(i + 1, 9).setValue(d.proyectoId || "");
          
          return ContentService.createTextOutput(JSON.stringify({success: true, msg: "Editado"})).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      if (!registroEncontrado) {
        return ContentService.createTextOutput(JSON.stringify({success: false, error: "Registro no encontrado"})).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Guardar Hora Nueva
    sheet.appendRow([
      Date.now(), 
      d.date, 
      d.client, 
      d.hours, 
      d.type || "Remoto", 
      d.requester || "", 
      d.description || "",
      d.consultor || "",
      d.proyectoId || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("ERROR: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
