# OPPAILAND AWARDS

Sitio estático del evento **OPPAILAND AWARDS** (tecnología, juegos, anime y ambientación nicaragüense).

## Publicar en GitHub Pages

Este repo ya incluye el workflow de despliegue automático en:

- `.github/workflows/deploy-pages.yml`

### Pasos para tener link público

1. Sube este repositorio a GitHub (si aún no tiene remoto).
2. En GitHub, entra a **Settings → Pages**.
3. En **Build and deployment**, selecciona **GitHub Actions**.
4. Haz push a la rama (`main`, `master` o `work`).
5. Espera que termine el workflow **Deploy static site to GitHub Pages**.
6. GitHub te dará una URL pública, normalmente:
   - `https://<usuario>.github.io/<repositorio>/`

## Desarrollo local

```bash
python3 -m http.server 4173
```

Abrir en `http://127.0.0.1:4173`.
