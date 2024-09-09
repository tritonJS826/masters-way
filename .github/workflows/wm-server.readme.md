# Documentation for Deploy to Server GitHub Actions Pipeline

This document provides a detailed explanation of the GitHub Actions pipeline used for deploying to a server. The pipeline consists of three jobs: `build-and-push`, `deploy`, and `notify`.

## Workflow Configuration

### Trigger Conditions

The workflow is triggered on:

- Push events to the `main` branch affecting files within the `mw-server` directory.

```yaml
name: Deploy to Server

on:
  push:
    branches:
      - main
    paths:
      - 'mw-general/**'
  # workflow_dispatch:
```

## Jobs

### 1. `build-and-push` Job

This job builds and pushes a Docker image to DockerHub.

#### Runs On

- `ubuntu-latest`

#### Steps

1. **Checkout code**

    Checks out the repository code.

    ```yaml
    - name: Checkout code
      uses: actions/checkout@v3
    ```

2. **Set up Docker Buildx**

    Sets up Docker Buildx for multi-platform builds.

    ```yaml
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    ```

3. **Login to DockerHub**

    Logs in to DockerHub using credentials stored in GitHub Secrets.

    ```yaml
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_TOKEN }}
    ```

4. **Extract commit info**

    Extracts the short commit hash and the current date.

    ```yaml
    - name: Extract commit info
      id: extract-info
      run: |
        echo "COMMIT_HASH=$(git rev-parse --short HEAD)" >> $GITHUB_ENV
        echo "COMMIT_DATE=$(date -u +%Y%m%d)" >> $GITHUB_ENV
    ```

5. **Build and push Docker image**

    Builds the Docker image using the `mw-server/Dockerfile` and pushes it to DockerHub.

    ```yaml
    - name: Build and push Docker image
      run: |
        IMAGE_NAME=mazurovsasha/mv-test:mw-server.${{ env.COMMIT_HASH }}.${{ env.COMMIT_DATE }}
        docker build -t $IMAGE_NAME -f mw-server/Dockerfile mw-server
        docker push $IMAGE_NAME
    ```

### 2. `deploy` Job

This job deploys the Docker image to a server.

#### Runs On

- `ubuntu-latest`

#### Dependencies

- `build-and-push` job

#### Steps

1. **Checkout code**

    Checks out the repository code.

    ```yaml
    - name: Checkout code
      uses: actions/checkout@v3
    ```

2. **Extract commit info**

    Extracts the short commit hash and the current date.

    ```yaml
    - name: Extract commit info
      id: extract-info
      run: |
        echo "COMMIT_HASH=$(git rev-parse --short HEAD)" >> $GITHUB_ENV
        echo "COMMIT_DATE=$(date -u +%Y%m%d)" >> $GITHUB_ENV
    ```

3. **Set up SSH**

    Sets up SSH access using the provided private key.

    ```yaml
    - name: Set up SSH
      uses: webfactory/ssh-agent@v0.5.3
      with:
        ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
    ```

4. **Deploy to Server**

    Deploys the Docker image to the server using SSH.

    ```yaml
    - name: Deploy to Server
      env:
        COMMIT_HASH: ${{ env.COMMIT_HASH }}
        COMMIT_DATE: ${{ env.COMMIT_DATE }}
        DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
        DOCKER_TOKEN: ${{ secrets.DOCKER_TOKEN }}
        ENV_FILE_PATH: ${{ secrets.ENV_FILE_PATH }}
      run: |
        ssh -o StrictHostKeyChecking=no ${{ secrets.USER_SERVER }}@${{ secrets.IP_SERVER }} << EOF
          export COMMIT_HASH=${COMMIT_HASH}
          export COMMIT_DATE=${COMMIT_DATE}
          export DOCKER_USERNAME=${DOCKER_USERNAME}
          export DOCKER_TOKEN=${DOCKER_TOKEN}
          export ENV_FILE_PATH=${ENV_FILE_PATH}

          echo ${DOCKER_TOKEN} | docker login -u ${DOCKER_USERNAME} --password-stdin
          docker pull mazurovsasha/mv-test:mw-server.${COMMIT_HASH}.${COMMIT_DATE}
          docker stop test-repo-mv_mw-server_1 || true
          docker rm test-repo-mv_mw-server_1 || true
          docker run --env-file ${ENV_FILE_PATH} -d --name test-repo-mv_mw-server_1 --restart unless-stopped -p 8000:8000 --network test-repo-mv_app-network mazurovsasha/mv-test:mw-server.${COMMIT_HASH}.${COMMIT_DATE}
          
          docker images --format '{{.Repository}}:{{.Tag}}' | grep 'mazurovsasha/mv-test:mw-server' | grep -v '${COMMIT_HASH}.${COMMIT_DATE}' | xargs -I {} docker rmi {}
        EOF
    ```

### 3. `notify` Job

This job sends a notification via Telegram once the deployment is completed.

#### Runs On

- `ubuntu-latest`

#### Dependencies

- `build-and-push` job
- `deploy` job

#### Steps

1. **Send Telegram Notification**

    Sends a notification to a specified Telegram chat with the status of the job.

    ```yaml
    - name: Send Telegram Notification
      if: always()
      env:
        TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_TOKEN }}
        TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
      run: |
        STATUS=${{ job.status }}
        MESSAGE="GitHub Action completed with status: $STATUS. Deployment of mw-server with tag mw-server"
        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d text="$MESSAGE"
    ```

## Secrets

The following secrets need to be configured in the GitHub repository settings:

- `DOCKER_USERNAME`: DockerHub username.
- `DOCKER_TOKEN`: DockerHub access token.
- `SSH_PRIVATE_KEY`: SSH private key for accessing the deployment server.
- `USER_SERVER`: Username for the deployment server.
- `IP_SERVER`: IP address of the deployment server.
- `ENV_FILE_PATH`: Path to the environment file on the server.
- `TELEGRAM_TOKEN`: Telegram bot token.
- `TELEGRAM_CHAT_ID`: Telegram chat ID to send notifications to.


## Note

- Replace `victorveretennikov58/masters-way` with your own Docker image name.
- Ensure the network name specified in `--network test-repo-mv_app-network` is correct.
- Verify the container name `test-repo-mv_mw-server_1` is accurate and does not conflict with existing containers.


## Setup

To trigger the pipeline, ensure that the `mw-server` directory exists in your Git repository. This directory should contain the necessary files for building and deploying your application.

Additionally, create a `.github/workflows` directory in your Git repository and place the pipeline YAML file in this directory.


## Obtaining Telegram Credentials

To obtain the `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID`:

1. **Create a Telegram Bot:**
    - Open Telegram and search for `@BotFather`.
    - Start a chat with `@BotFather` and use the `/newbot` command to create a new bot.
    - Follow the instructions to name your bot and create a username for it.
    - After the bot is created, `@BotFather` will provide a `TELEGRAM_TOKEN`.

2. **Get the Chat ID:**
    - Add your new bot to a Telegram group or channel.
    - Send a message to the group or channel.
    - Use the Telegram API to get updates by accessing the following URL in your browser:
      ```
      https://api.telegram.org/bot<TELEGRAM_TOKEN>/getUpdates
      ```
    - Look for the `chat` object in the response JSON and find the `id` field. This value is your `TELEGRAM_CHAT_ID`.