# Hotel Offer Orchestrator

This system orchestrates hotel searches across multiple suppliers using Temporal's durable workflow engine to ensure reliability and fault tolerance.

## 🏗️ Architecture

The system consists of three main components:

-   **API Server**: An Express.js REST API that receives hotel search requests.
-   **Temporal Worker**: A background process that executes the workflow orchestrations.
-   **Redis Cache**: An in-memory cache used for fast response times.

```

┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Client    │────▶│  API Server  │────▶│ Temporal Server │
└─────────────┘     └──────────────┘     └─────────────────┘
│                       │
▼                       ▼
┌──────────────┐     ┌─────────────────┐
│    Redis     │     │ Temporal Worker │
└──────────────┘     └─────────────────┘

```

## ✨ Features

-   **Durable Workflows**: Hotel searches are managed by Temporal workflows, ensuring reliability and automatic retries on failure .
-   **Integrated Caching**: Utilizes Redis for caching search results with a one-hour TTL to reduce latency on repeated queries.
-   **Dynamic Price Filtering**: Allows clients to filter results by a price range (`minPrice` and `maxPrice`).
-   **Scalable Architecture**: The API server and Temporal worker are separate services that can be scaled independently.

## 🚀 Getting Started

Follow these steps to get the project running locally.

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/) v20.10 or higher
-   [Docker Compose](https://docs.docker.com/compose/install/) v2.0 or higher
-   [Temporal CLI](https://docs.temporal.io/cli#install)

### 1. Clone the Repository

```

git clone https://github.com/AnujPancholiGithub/temporal-hotel-orchestration-temp.git
cd temporal-hotel-orchestration-temp

```

### 2. Create the Environment File

Create a `.env` file in the project root by copying the development file. This file will hold your local configuration.

```

cp .env.development .env

```

The default `.env` content is configured for local development:
```

NODE_ENV=development
TEMPORAL_ADDRESS=host.docker.internal:7233
TEMPORAL_NAMESPACE=default
TEMPORAL_API_KEY=
REDIS_HOST=redis

```

### 3. Start the Local Temporal Server

Open a **separate terminal** and run the Temporal development server. This must remain running in the background.

```

temporal server start-dev

```

You should see output confirming the server has started:
```

Server:  localhost:7233
UI:      http://localhost:8233  <-- You can access the Temporal Web UI here

```

### 4. Build and Run the Application

With the Temporal server running, use Docker Compose to build and start the application services.

```

docker-compose up --build -d

```

The `-d` flag runs the containers in detached mode. To view the logs, you can run:

```

docker-compose logs -f

```

The API server will now be available at `http://localhost:3000`.

### 5. Test the API

You can test the endpoint using `curl` or any API client.

**Example 1: Basic search**
```

curl "http://localhost:3000/api/hotels?city=delhi"

```

**Example 2: Search with price filtering**
```

curl "http://localhost:3000/api/hotels?city=delhi\&minPrice=7000\&maxPrice=10000"

```

The first request will be a `Cache MISS`, triggering the workflow. Subsequent identical requests will result in a `Cache HIT`, returning data directly from Redis.

## 🌍 Environment Variables if you want to run it in production add TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE, TEMPORAL_API_KEY from your Temporal Cloud account.

| Variable           | Description                                  | Default Value                    |
| ------------------ | -------------------------------------------- | -------------------------------- |
| `NODE_ENV`         | The application environment.                 | `development`                    |
| `TEMPORAL_ADDRESS` | The address of the Temporal server.          | `host.docker.internal:7233`      |
| `TEMPORAL_NAMESPACE` | The Temporal namespace to operate in.        | `default`                      |
| `TEMPORAL_API_KEY` | The API key for connecting to Temporal Cloud.  | (none)                         |
| `REDIS_HOST`       | The hostname of the Redis service.           | `redis`                          |

