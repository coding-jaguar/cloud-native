## 📁 Project Structure

```

my-app/
├── Dockerfile
├── server.js
├── package.json
├── deployment.yaml
├── service.yaml
└── kind-cluster.yaml (optional if using kind with local image)

```

---

## ✅ Prerequisites

- Docker & Docker CLI
- Node.js
- Kubernetes CLI (`kubectl`)
- [kind](https://kind.sigs.k8s.io/)
- Docker Hub account

---

## 🛠️ Step-by-Step Instructions

### 1. Clone or create the Express App

Create a minimal app in `server.js`:

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Kubernetes! 🚀");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Create `package.json`:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

### 2. Create the Dockerfile

```Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
```

---

### 3. Build and Push the Docker Image

```bash
docker build -t my-express-app .
docker tag my-express-app yourusername/my-express-app:latest
docker login
docker push yourusername/my-express-app:latest
```

> Replace `yourusername` with your Docker Hub username.

---

### 4. Create `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express-app-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: express-app
  template:
    metadata:
      labels:
        app: express-app
    spec:
      containers:
        - name: express-app
          image: yourusername/my-express-app:latest
          ports:
            - containerPort: 3000
```

---

### 5. Create `service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: express-app-service
spec:
  type: NodePort
  selector:
    app: express-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      nodePort: 30007
```

---

### 6. Create kind Cluster (Optional)

```yaml
# kind-cluster.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 30007
        hostPort: 30007
        protocol: TCP
  - role: worker
  - role: worker
```

Create the cluster:

```bash
kind create cluster --name sit737-cluster --config kind-cluster.yaml
```

---

### 7. Deploy to Kubernetes

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

---

### 8. Access the App

In your browser or terminal, open:

```bash
http://localhost:30007
```

You should see:

```
Hello from Kubernetes! 🚀
```

---

## 📦 Deliverables for Submission

- [x] `Dockerfile`
- [x] `deployment.yaml`
- [x] `service.yaml`
- [x] `README.md` (this file)
- [x] App accessible via NodePort on `localhost`
