# 🛒 Ecommerce API con Express.js y MySQL

API RESTful para gestionar productos con imágenes generadas automáticamente usando Lorem Picsum.

## 🚀 Enlace desplegado

👉 https://mi-api-ecommerce.onrender.com/api/products

## 🧱 Tecnologías

- Node.js
- Express.js
- MySQL
- Joi (validación)
- Axios (consumo de API)
- Render / Railway

## 📦 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/products | Listar todos los productos |
| GET | /api/products/:id | Obtener un producto por ID |
| POST | /api/products | Crear producto (con imagen automática) |
| PUT | /api/products/:id | Actualizar producto |
| DELETE | /api/products/:id | Eliminar producto |

## 🔧 Instalación local

```bash
git clone https://github.com/usuario/ecommerce-api.git
cd ecommerce-api
npm install
cp .env.example .env
# Editar tus datos MySQL en .env
node index.js
