# Team maker

Dieses Projekt ist eine Full-Stack-Webanwendung mit einem **Express-Backend** (Node.js, Port 8080) und einem **Lit-Frontend** (Web Components, Port 8081 im Dev-Modus).

## Architektur

```text
client-src/    ← Lit-Frontend (Web Components, SPA)
api/           ← Express-Backend (REST-API unter /api)
server.js      ← Einstiegspunkt: Express-Server, statische Auslieferung des Builds
vite.config.js ← Vite-Dev-Server für das Frontend inkl. Proxy zu /api
```

Im **Entwicklungsmodus** laufen zwei Server parallel (via `concurrently`):

- **Backend** (nodemon, Port 8080): startet bei Änderungen automatisch neu
- **Frontend** (Vite, Port 8081): Hot Module Replacement, leitet `/api`-Requests per Proxy an Port 8080 weiter

Im **Produktionsbetrieb** läuft nur ein einziger Express-Server (Port 8080), der sowohl das gebaute Frontend als statische Dateien ausliefert als auch die API bedient.

## how to run (Entwicklung)

```bash
npm install       # Abhängigkeiten installieren (einmalig)
npm run dev       # Backend + Frontend-Dev-Server gleichzeitig starten
```

| URL                               | Beschreibung                              |
| --------------------------------- | ----------------------------------------- |
| <http://localhost:8081>           | Frontend (Vite Dev-Server mit HMR)        |
| <http://localhost:8081/api/items> | API - über den Vite-Proxy weitergeleitet  |
| <http://localhost:8080/api/items> | API - direkt am Express-Server            |

> `/api`-Requests an Port 8081 werden von Vite automatisch an Port 8080 weitergeleitet (Proxy). Dadurch gibt es keine CORS-Probleme im Dev-Modus.

## how to build (Produktion)

```bash
npm run client:build   # Frontend mit Vite nach client-dist/ bauen
npm start              # Express-Server starten (Port 8080)
```

Vite kompiliert und optimiert das Frontend (Tree-Shaking, Minification) und legt das Ergebnis in `client-dist/` ab. Der Express-Server liefert diesen Ordner dann als statische Dateien aus - gemeinsam mit der REST-API auf demselben Port.

| URL                               | Beschreibung                          |
| --------------------------------- | ------------------------------------- |
| <http://localhost:8080>           | Frontend (vom Express-Server)         |
| <http://localhost:8080/api/items> | REST-API                              |
