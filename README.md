# Portfolio - Arnau

Portfolio personal de Arnau, desarrollador especializado en Discord Bots, servidores de Minecraft, desarrollo web y sistemas de redes.

## 🚀 Despliegue en Producción

Este proyecto está optimizado y listo para ser desplegado en plataformas gratuitas como Vercel, Netlify o Cloudflare Pages.

### Opción 1: Despliegue en Vercel (Recomendado)

#### Paso 1: Subir a GitHub
1. Crea un nuevo repositorio en GitHub (github.com/new)
2. En tu terminal, ejecuta:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/portfolio.git
   git branch -M main
   git push -u origin main
   ```

#### Paso 2: Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Haz clic en "Add New Project"
3. Selecciona tu repositorio `portfolio` de GitHub
4. Vercel detectará automáticamente que es un sitio estático
5. Haz clic en "Deploy"
6. ¡Tu sitio estará en vivo en unos minutos!

#### Paso 3: Configurar dominio personalizado (Opcional)
1. En el dashboard de Vercel, ve a "Settings" > "Domains"
2. Añade tu dominio personalizado (ej: arnau.dev)
3. Vercel te dará los registros DNS que debes configurar en tu proveedor de dominios
4. Configura los registros DNS:
   - **Tipo A**: apunta a `76.76.21.21`
   - **Tipo CNAME**: apunta a `cname.vercel-dns.com`

### Opción 2: Despliegue en Netlify

#### Paso 1: Subir a GitHub
(Same as above)

#### Paso 2: Desplegar en Netlify
1. Ve a [netlify.com](https://netlify.com) e inicia sesión con GitHub
2. Haz clic en "Add new site" > "Import an existing project"
3. Selecciona tu repositorio `portfolio`
4. Configura los build settings (Netlify los detectará automáticamente):
   - Build command: (dejar vacío)
   - Publish directory: `/`
5. Haz clic en "Deploy site"

#### Paso 3: Configurar dominio personalizado
1. Ve a "Domain settings" > "Add custom domain"
2. Añade tu dominio
3. Configura los registros DNS según las instrucciones de Netlify

### Opción 3: Despliegue en Cloudflare Pages

#### Paso 1: Subir a GitHub
(Same as above)

#### Paso 2: Desplegar en Cloudflare Pages
1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) > Pages
2. Haz clic en "Create a project" > "Connect to Git"
3. Selecciona tu repositorio `portfolio`
4. Configura:
   - Build command: (dejar vacío)
   - Build output directory: `/`
5. Haz clic en "Save and Deploy"

## 📝 Actualización Automática

Una vez configurado el despliegue automático desde GitHub:
1. Cada vez que hagas cambios en el código
2. Haz commit y push:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. La plataforma (Vercel/Netlify/Cloudflare) detectará los cambios automáticamente
4. Tu sitio se actualizará en unos minutos

## 🔧 Configuración SEO

El proyecto incluye:
- Meta tags optimizados para SEO
- Open Graph para compartir en redes sociales
- Twitter Cards
- Favicon (necesitas agregar las imágenes reales)
- Sitemap.xml
- Robots.txt

**Nota:** Debes reemplazar los archivos de favicon vacíos con tus imágenes reales:
- `favicon-16x16.png` (16x16 píxeles)
- `favicon-32x32.png` (32x32 píxeles)
- `apple-touch-icon.png` (180x180 píxeles)
- `og-image.png` (1200x630 píxeles para Open Graph)

## 📱 Responsive Design

El sitio está optimizado para:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Móvil (320px - 768px)

## ⚡ Optimización

- CSS y JS optimizados
- Carga de fuentes optimizada con preconnect
- Librerías externas cargadas desde CDN
- Imágenes (cuando se agreguen) deben optimizarse

## 📄 Estructura del Proyecto

```
portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # Funcionalidad JavaScript
├── robots.txt          # Configuración para crawlers
├── sitemap.xml         # Mapa del sitio para SEO
├── vercel.json         # Configuración de Vercel
├── site.webmanifest    # Manifest para PWA
├── favicon-16x16.png   # Favicon 16x16 (agregar imagen real)
├── favicon-32x32.png   # Favicon 32x32 (agregar imagen real)
├── apple-touch-icon.png # Icono para iOS (agregar imagen real)
└── README.md           # Este archivo
```

## 🎨 Personalización

Para personalizar el portfolio:
1. Cambia la información personal en `index.html`
2. Modifica los colores en `styles.css` (variables CSS en `:root`)
3. Agrega tus proyectos reales en la sección de proyectos
4. Actualiza los enlaces a tus redes sociales
5. Reemplaza los favicons con tus propias imágenes

## 📧 Contacto

El formulario de contacto actualmente es visual. Para hacerlo funcional:
1. Integra un servicio como Formspree, Netlify Forms, o EmailJS
2. O crea un backend con Node.js para procesar los formularios

---

**© 2026 Arnau. Todos los derechos reservados.**
