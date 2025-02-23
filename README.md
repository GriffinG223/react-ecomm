**How to Access and Work with the Git Repository**

### **1. Clone the Repository**
To start working on the project, clone the GitHub repository:
```sh
git clone git@github.com:GriffinG223/react-ecomm.git
```
Then navigate into the project directory:
```sh
cd react-ecomm
```

---

### **2. Set Up the Repository Locally**
Ensure you have the latest branches from the remote repository:
```sh
git fetch --all
```
Check available branches:
```sh
git branch -r
```
You should see:
```
  origin/head
  origin/staging
  origin/griffin-branch
  origin/kiahna-branch
  origin/gael-branch
  origin/evan-branch
  origin/morgo-branch
```

---

### **3. Checkout Your Assigned Branch**
Each team member should work on their assigned branch:
```sh
git checkout -b griffin-branch origin/griffin-branch  # Example for Griffin
```
Do the same for your assigned branch:
```sh
git checkout -b <your-branch-name> origin/<your-branch-name>
```

---

### **4. Make Changes and Commit**
After making changes, add and commit your work:
```sh
git add .
git commit -m "Your commit message"
```

---

### **5. Push Changes to GitHub**
To save your work on GitHub, push your changes:
```sh
git push origin <your-branch-name>
```

---

### **6. Merge Changes into Staging**
Once ready, switch to `staging` and merge your branch:
```sh
git checkout staging
git pull origin staging  # Ensure latest version
git merge <your-branch-name>
git push origin staging  # Push updated staging branch
```

---

### **7. Final Testing and Deployment to Head**
Once all branches are merged into `staging` and tested:
```sh
git checkout head
git pull origin head  # Ensure latest version
git merge staging
git push origin head  # Deploy final version
```

---

### **8. Keeping Your Branch Updated**
Regularly update your branch with the latest `staging` changes:
```sh
git checkout <your-branch-name>
git pull origin staging
git merge staging
```

---

### **9. Checking Branch Status**
To check the status of your branch:
```sh
git status
```
To see all branches and their tracking info:
```sh
git branch -vv
```

---

### **10. Additional Git Commands**
- Check all local and remote branches:
  ```sh
  git branch -a
  ```
- Fetch latest updates without merging:
  ```sh
  git fetch origin
  ```
- Delete a branch after merging:
  ```sh
  git branch -d <your-branch-name>
  git push origin --delete <your-branch-name>
  ```

---


**Docker Build Instructions for E-Commerce React App**

### Prerequisites:
1. Install [Docker](https://www.docker.com/get-started) on your machine.
2. Ensure you have `docker-compose` installed (optional but recommended).
3. Clone the project repository:
   ```sh
   ** SEE GIT CLONING PART OF README, one cloned then proceed to cd react-ecomm
   cd react-ecomm
   ```

### Running the Application from Repository:
Once you have cloned the repository, navigate to the project directory and run the following command to build and start the application:

```sh
docker-compose up --build
```

This will automatically build and start both the JSON server and React app in their respective containers.

-----------------------------------------------------------------------------------------------------------------------------------











------------------------------------------------------------------------------------------------------------------------------------

## **Accessing the Application**

### 1. JSON Server (Backend API)
- Once the container is running, you can access the JSON server at:
  ```
  http://localhost:4000
  ```
  You can verify if the server is working by visiting:
  ```
  http://localhost:4000/products
  ```
  (assuming `products` exist in `db.json`).

### 2. React Frontend
- The React app will be available at:
  ```
  http://localhost:3000
  ```
  Open this in your web browser to interact with the e-commerce site.

---

## **Basic Troubleshooting**

### 1. Port Conflicts
If ports 5000 or 3000 are in use, modify the `docker-compose.yml` file to use different ports:
```yaml
  ports:
    - "8080:80"  # Change 3000 to another available port for React
    - "6000:4000" # Change 5000 to another available port for JSON Server
```
Then run:
```sh
docker-compose up --build
```

### 2. Container Already Running
If you get an error about ports being occupied, stop any running containers with:
```sh
docker-compose down
```
And restart:
```sh
docker-compose up --build
```

### 3. Clearing Docker Cache
If you encounter build errors, try clearing Docker's cache:
```sh
docker system prune -a
```
Then rebuild the project:
```sh
docker-compose up --build
```

---

This guide ensures your e-commerce React app and JSON server are containerized and can be easily deployed anywhere with Docker.
-----------------------------------------------------------------------------------------------------------------------------------











------------------------------------------------------------------------------------------------------------------------------------
**Guide to Installing Docker on Windows, Mac, and Linux**

## **1. Installing Docker on Windows**

### **System Requirements**
- Windows 10 (Pro, Enterprise, or Education) or Windows 11
- WSL 2 (Windows Subsystem for Linux) recommended
- 64-bit processor with virtualization support

### **Installation Steps**
1. **Download Docker Desktop:**
   - Go to [Docker’s official website](https://www.docker.com/products/docker-desktop/).
   - Download the Windows version of Docker Desktop.

2. **Install Docker Desktop:**
   - Run the installer and follow the on-screen instructions.
   - Select **WSL 2** during installation if prompted.

3. **Verify Installation:**
   - Open PowerShell or Command Prompt and run:
     ```sh
     docker --version
     ```
   - You should see Docker's version number.

4. **Start Docker:**
   - Search for **Docker Desktop** in the Start menu and launch it.
   - Wait for Docker to initialize (the Docker icon in the system tray should be stable).

5. **Run a Test Container:**
   ```sh
   docker run hello-world
   ```
   This verifies Docker is working properly.

---

## **2. Installing Docker on macOS**

### **System Requirements**
- macOS 11 (Big Sur) or later
- Apple Silicon (M1/M2) or Intel Mac

### **Installation Steps**
1. **Download Docker Desktop:**
   - Visit [Docker’s official website](https://www.docker.com/products/docker-desktop/).
   - Download the macOS version (choose the right version for Intel or Apple Silicon).

2. **Install Docker Desktop:**
   - Open the downloaded `.dmg` file.
   - Drag the Docker icon to the Applications folder.

3. **Run Docker:**
   - Open **Docker Desktop** from Applications.
   - Grant necessary permissions if prompted.

4. **Verify Installation:**
   - Open **Terminal** and run:
     ```sh
     docker --version
     ```
   - You should see Docker's version number.

5. **Run a Test Container:**
   ```sh
   docker run hello-world
   ```

---

## **3. Installing Docker on Linux**

### **System Requirements**
- 64-bit Linux distribution (Debian, Ubuntu, Fedora, CentOS, Arch, etc.)
- Kernel version 3.10 or later

### **Installation Steps for Ubuntu/Debian**
1. **Update package lists:**
   ```sh
   sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
   ```

2. **Add Docker’s official GPG key:**
   ```sh
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

3. **Add Docker repository:**
   ```sh
   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

4. **Install Docker:**
   ```sh
   sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io
   ```

5. **Verify Installation:**
   ```sh
   docker --version
   ```

6. **Enable and start Docker service:**
   ```sh
   sudo systemctl enable docker
   sudo systemctl start docker
   ```

7. **Run a Test Container:**
   ```sh
   sudo docker run hello-world
   ```

### **For Fedora, CentOS, and Arch Linux**
Refer to [Docker's official documentation](https://docs.docker.com/engine/install/) for distribution-specific installation steps.

---

## **Post-Installation Tips**

### **Allow Non-Root User to Run Docker (Linux Only)**
By default, Docker requires root privileges. To allow a non-root user to run Docker:
```sh
sudo usermod -aG docker $USER
newgrp docker
```
Then try running `docker run hello-world` without `sudo`.

### **Uninstalling Docker**
To remove Docker completely:
- **Windows & macOS:** Uninstall via system settings.
- **Linux:**
  ```sh
  sudo apt remove docker-ce docker-ce-cli containerd.io
  sudo rm -rf /var/lib/docker
  ```

This guide ensures you have Docker installed and ready to use on Windows, macOS, and Linux systems.



