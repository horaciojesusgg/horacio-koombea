
# Node Developer Test - Horacio Gonzalez

A brief description of what this project does and who it's for


## Backend Installation
Step 1: Installation
On the root of the project, run:

```bash
  npm install 
```
    
Step 2: Initialize databse executing this on the root:
```bash
  docker compose up -d
```

Step 3: Search the .env.example file and rename it to .env

Step 4: Run the migrations with: 
```bash
  npm run typeorm migration:run -- -d src/repository/db
```

Step 4: Run the project with the command 
```bash
  npm run dev
```
## Frontend Installation
Step 1: Navigate to the ui folder using

```bash
  cd ui
```
    
Step 2: Install dependencies
```bash
  npm i
```

Step 3: Start the project 
```bash
  npm start
```

The project should start on port 3001
## Resources

You will be able to find a test CSV file named 'test-file-koombea-horacio.csv' under the "resources" directory on the project root.

You will be able to log in with the following credentials: 
```bash
email: testuser@koombea.com
password: testPassword
```
