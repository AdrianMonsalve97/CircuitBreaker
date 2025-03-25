# 🎬 Implementación de Circuit Breaker en Angular con Interceptor HTTP y NgRx

## 📌 Descripción de la prueba
El objetivo de esta prueba es implementar un **Circuit Breaker** en una aplicación **Angular** para gestionar fallos en las solicitudes HTTP realizadas a la API pública de **OMDb** (Open Movie Database).

Para esto, se desarrolló un **interceptor HTTP** que detecta errores en las peticiones y evita sobrecargar la API cuando hay fallos repetidos. Además, se utilizó **NgRx** para gestionar el estado global de la aplicación, asegurando que los datos de las películas se almacenen de manera eficiente y reactiva.

Se simuló una degradación progresiva en la disponibilidad de la API, reduciendo el porcentaje de fallos desde **80% hasta 20%**, para evaluar la capacidad del sistema de recuperarse y seguir funcionando de manera estable.

---

## 🎯 Objetivo(s) de la prueba
✅ Implementar un **Circuit Breaker** para evitar sobrecargas en la API.  
✅ Desarrollar un **interceptor HTTP** para manejar errores globalmente.  
✅ Integrar **NgRx** para gestionar el estado de las películas de manera centralizada.  
✅ Probar la resiliencia del sistema con respuestas fallidas de la API de **OMDb**.  
✅ Mejorar la experiencia del usuario mediante un manejo adecuado de errores y almacenamiento en caché.

---

## 🛠️ Pasos implementados para llevar a cabo la prueba

### 🔹 1. Creación de un `HttpInterceptor`
Se desarrolló un **interceptor HTTP** en Angular para capturar errores de las solicitudes y aplicar el **Circuit Breaker**. Cuando detecta fallos continuos, el sistema bloquea temporalmente nuevas peticiones, mostrando un mensaje de error al usuario.

### 🔹 2. Integración con la API de OMDb
Se implementó un servicio (`MovieService`) para realizar solicitudes a **OMDb**, obteniendo información sobre películas a partir de un término de búsqueda.

### 🔹 3. Implementación de NgRx para la gestión del estado
Se utilizó **NgRx** para administrar el estado de la aplicación, permitiendo:
- Almacenar las películas obtenidas de la API.
- Evitar realizar solicitudes innecesarias si la película ya ha sido consultada.
- Manejar el estado de carga y errores de manera reactiva.

### 🔹 4. Simulación de fallos en la API
Para probar el **Circuit Breaker**, se ejecutaron solicitudes en distintos escenarios donde la API devolvía errores en un rango del **80% al 20%** de las veces, midiendo la capacidad del sistema para adaptarse y recuperarse.

---

## 🛠️ Tecnologías usadas en la prueba
- **Lenguaje:** TypeScript
- **Framework:** Angular
- **Librerías:**
  - **NgRx** (gestión del estado global)
  - **RxJS** (manejo de estados y reintentos)
  - **Angular HTTP Client**
  - **DaisyUI + TailwindCSS** (para la UI)
- **API utilizada:** [OMDb API](https://www.omdbapi.com/)

---

## 📊 Resultados
✅ El **Circuit Breaker** previno sobrecargas en la API cuando los fallos fueron recurrentes.  
✅ El **interceptor HTTP** gestionó errores de manera centralizada, mejorando la estabilidad de la aplicación.  
✅ La API de **OMDb** respondió correctamente cuando la conexión era estable y bloqueó cuando se excedió el límite de peticiones.  
✅ **NgRx permitió gestionar el estado de manera eficiente**, evitando llamadas innecesarias y mejorando el rendimiento de la aplicación.

---

## 📌 Conclusiones
- **El uso de Circuit Breaker mejora la resiliencia** de aplicaciones conectadas a APIs externas.
- **El interceptor HTTP centraliza la gestión de errores**, evitando redundancias en el código.
- **NgRx optimiza la gestión del estado**, reduciendo peticiones innecesarias y mejorando la experiencia del usuario.
- **Simular fallos permitió evaluar la robustez** del sistema ante interrupciones en el servicio.

---

🚀 **¡Prueba completada con éxito!** 🔥
