# Docker Image Base

React frontend, Spring Boot backend, and MariaDB are orchestrated with Docker Compose.

## Branch Workflow

- `main`: release branch. Docker images are published from this branch.
- `dev`: integration branch for completed feature work.
- `feat/<type>-<description>`: feature branches created from `dev`.

Recommended flow:

```bash
git switch main
git switch -c dev
git switch -c feat/ci-cd
```

After each logical unit of work:

```bash
git add .
git commit -m "type: short description"
```

Example commit types:

- `feat`: user-facing feature
- `fix`: bug fix
- `ci`: GitHub Actions, deployment, pipeline work
- `chore`: project setup or maintenance

## Local Run

```bash
docker compose up -d
```

Frontend: http://localhost:63342

Backend: http://localhost:8080

MariaDB: localhost:3316

## CI/CD

GitHub Actions runs CI on `main`, `dev`, and `feat/**` branches.

On `main` pushes, the workflow builds and pushes Docker images to Docker Hub:

- `${DOCKERHUB_USERNAME}/yj-backend`
- `${DOCKERHUB_USERNAME}/yj-frontend`

Set these GitHub repository secrets before using CD:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
