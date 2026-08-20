# ⌘⟨/⟩ CODEXIA

## Code. Collaborate. Interview.

> A full-stack collaborative coding interview platform that brings
> **technical problem solving, live coding, remote code execution, video
> communication, and real-time chat** into a single interview workspace.

------------------------------------------------------------------------

## 🚀 Why CODEXIA?

Traditional technical interviews often require multiple disconnected
tools:

``` text
Google Meet + LeetCode + Online Compiler + WhatsApp / Slack
```

CODEXIA brings these capabilities together:

``` text
┌──────────────────────────────────────────────────────┐
│                       CODEXIA                        │
│                                                      │
│  Problem              Monaco Editor       Video Call │
│                                                      │
│  Output                                  Chat        │
│                                                      │
└──────────────────────────────────────────────────────┘

              One platform. One session.
              One collaborative workspace.
```

------------------------------------------------------------------------

# 🏗️ System Architecture

CODEXIA is organized into distinct architectural layers.

``` text
┌──────────────────────────────────────────────────────┐
│                    USER LAYER                        │
│          Browser / Interviewer / Candidate           │
└─────────────────────────┬────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│               PRESENTATION LAYER                     │
│       React • Router • Tailwind • Monaco              │
└─────────────────────────┬────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                STATE / API LAYER                     │
│              TanStack Query • Axios                  │
└─────────────────────────┬────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                APPLICATION LAYER                     │
│       Express • Routes • Middleware • Controllers   │
└─────────────────────────┬────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                    DATA LAYER                        │
│               Mongoose • MongoDB                     │
└──────────────────────────────────────────────────────┘

                    External Services
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
           Clerk        Stream       Piston
           Auth       Video/Chat     Execute
             │
             ▼
          Inngest
          Workflows
```

------------------------------------------------------------------------

# 🧩 High-Level System Architecture

``` mermaid
flowchart TB

    USER["👤 User"]

    subgraph FRONTEND["Frontend"]
        REACT["React + Vite"]
        ROUTER["React Router"]
        QUERY["TanStack Query"]
        CLERK_CLIENT["Clerk Client"]
        MONACO["Monaco Editor"]
    end

    subgraph BACKEND["Backend"]
        EXPRESS["Node.js + Express"]
        ROUTES["REST Routes"]
        AUTH["Authentication Middleware"]
        CONTROLLERS["Controllers"]
        MODELS["Mongoose Models"]
    end

    MONGO[("MongoDB")]

    CLERK["Clerk<br/>Authentication & Identity"]
    INNGEST["Inngest<br/>Event Workflows"]
    STREAM["Stream<br/>Video + Chat"]
    PISTON["Piston<br/>Code Execution"]

    USER --> REACT
    REACT --> ROUTER
    REACT --> QUERY
    REACT --> CLERK_CLIENT
    REACT --> MONACO

    QUERY --> EXPRESS
    EXPRESS --> ROUTES
    ROUTES --> AUTH
    AUTH --> CONTROLLERS
    CONTROLLERS --> MODELS
    MODELS --> MONGO

    AUTH <--> CLERK

    CLERK --> INNGEST
    INNGEST --> MONGO
    INNGEST --> STREAM

    REACT <--> STREAM
    MONACO --> PISTON
```

------------------------------------------------------------------------

# 🔄 Complete Application Flow

``` mermaid
flowchart TD

    A["🌐 Open CODEXIA"] --> B["Landing Page"]

    B --> C{"Authenticated?"}

    C -->|No| D["Sign Up / Login"]
    C -->|Yes| H["Dashboard"]

    D --> E["Clerk Authentication"]
    E --> F["Authenticated Session"]
    F --> G["User Synchronization"]
    G --> H

    H --> I{"User Action"}

    I -->|Create Interview| J["Create Session"]
    I -->|Join Interview| K["Join Active Session"]

    J --> L["Select Problem + Difficulty"]
    L --> M["Create MongoDB Session"]
    M --> N["Create Stream Resources"]

    K --> O["Validate Session"]
    O --> P["Assign Participant"]

    N --> Q["Interview Room"]
    P --> Q

    Q --> R["Problem"]
    Q --> S["Monaco Editor"]
    Q --> T["Stream Video"]
    Q --> U["Stream Chat"]

    S --> V["Piston"]
    V --> W["Execution Output"]

    Q --> X["End Interview"]
    X --> Y["Mark Session Completed"]
```

------------------------------------------------------------------------

# 🔐 Authentication Architecture

Clerk acts as the identity provider for CODEXIA.

``` mermaid
sequenceDiagram

    actor User
    participant Frontend
    participant Clerk
    participant Backend
    participant MongoDB

    User->>Frontend: Sign Up / Login
    Frontend->>Clerk: Authentication Request
    Clerk->>Clerk: Verify Credentials
    Clerk-->>Frontend: Authenticated Session

    Frontend->>Backend: Protected API Request
    Backend->>Clerk: Verify Identity
    Clerk-->>Backend: Clerk User ID

    Backend->>MongoDB: Find User by clerkId
    MongoDB-->>Backend: Application User

    Backend-->>Frontend: Authorized Response
```

------------------------------------------------------------------------

# 👤 Identity Architecture

The same user exists across multiple services, while each service owns a
specific responsibility.

``` text
                         USER
                           │
            ┌──────────────┼───────────────┐
            │              │               │
            ▼              ▼               ▼
         CLERK          MONGODB          STREAM
            │              │               │
            ▼              ▼               ▼
       Identity        App User       Realtime User
       Credentials     Sessions       Video / Chat
       Auth
```

### Clerk

``` text
Authentication
Identity
Credentials
Sessions
Verification
```

### MongoDB

``` text
Application User
Interview Sessions
Host
Participant
Session State
```

### Stream

``` text
Video
Chat
Realtime Communication
```

------------------------------------------------------------------------

# ⚡ Inngest Event Architecture

Inngest handles event-driven user lifecycle synchronization.

``` mermaid
flowchart LR

    CLERK["Clerk"]
    CREATED["user.created"]
    INNGEST["Inngest"]
    USERDB["MongoDB User"]
    STREAMUSER["Stream User"]

    CLERK -->|"user.created"| CREATED
    CREATED --> INNGEST
    INNGEST -->|"Create / Sync"| USERDB
    INNGEST -->|"Create / Sync"| STREAMUSER
```

## User Registration Flow

``` text
New User
   │
   ▼
Sign Up
   │
   ▼
Clerk
   │
   ├── Create Identity
   ├── Store Credentials
   └── Create Authentication Session
   │
   ▼
user.created
   │
   ▼
Inngest
   │
   ├──────────────► MongoDB
   │                  │
   │                  ▼
   │              Application User
   │
   └──────────────► Stream
                      │
                      ▼
                  Stream User
```

## User Deletion Flow

``` text
User Deleted
     │
     ▼
   Clerk
     │
     ▼
user.deleted
     │
     ▼
 Inngest
     │
     ├──────────────► MongoDB
     │                  │
     │                  ▼
     │             Remove User
     │
     └──────────────► Stream
                        │
                        ▼
                   Remove User
```

------------------------------------------------------------------------

# 📊 Dashboard Architecture

``` text
                    DASHBOARD
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
       Active         Recent        Create
       Sessions       Sessions      Session
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                   Session APIs
                        │
                        ▼
                    Express
                        │
                        ▼
                    MongoDB
```

------------------------------------------------------------------------

# 🧑‍💻 Interview Session Architecture

The session is the central entity connecting the interviewer and
candidate.

``` mermaid
flowchart TB

    HOST["👨‍💻 Host"]
    CANDIDATE["👩‍💻 Candidate"]
    SESSION["Interview Session"]
    PROBLEM["Coding Problem"]
    MONGO["MongoDB"]
    STREAM["Stream"]

    HOST --> SESSION
    CANDIDATE --> SESSION
    SESSION --> PROBLEM
    SESSION --> MONGO
    SESSION --> STREAM
```

------------------------------------------------------------------------

# 🆕 Create Session Flow

``` mermaid
sequenceDiagram

    actor Host
    participant UI as React
    participant API as Express
    participant Auth as Clerk
    participant DB as MongoDB
    participant Stream

    Host->>UI: Create Session
    UI->>API: POST /api/sessions
    API->>Auth: Verify User
    Auth-->>API: Authenticated Identity
    API->>DB: Create Session
    DB-->>API: Session Created
    API->>Stream: Create Video Call
    API->>Stream: Create Chat Channel
    Stream-->>API: Resources Created
    API-->>UI: Session Details
    UI->>UI: Open Interview Room
```

------------------------------------------------------------------------

# 🔗 Session Resource Mapping

The `callId` connects the application session to Stream resources.

``` text
                 MongoDB
              InterviewSession
                    │
                  callId
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   Stream Video          Stream Chat
      Call                  Channel
          │                   │
          ▼                   ▼
      Camera              Messages
      Microphone
```

------------------------------------------------------------------------

# 👥 Join Session Flow

``` mermaid
sequenceDiagram

    actor Candidate
    participant UI as React
    participant API as Express
    participant DB as MongoDB
    participant Stream

    Candidate->>UI: Select Active Session
    UI->>API: POST /api/sessions/:id/join
    API->>DB: Find Session
    DB-->>API: Session Data
    API->>API: Validate Session
    API->>DB: Assign Participant
    DB-->>API: Updated Session
    API-->>UI: Join Successful
    UI->>Stream: Connect to Video
    UI->>Stream: Connect to Chat
```

------------------------------------------------------------------------

# 🧑‍🤝‍🧑 Interview Room Flow

``` text
                     INTERVIEW ROOM
                           │
       ┌───────────────────┼────────────────────┐
       │                   │                    │
       ▼                   ▼                    ▼
    Problem              Video                Chat
       │                   │                    │
       │                 Stream               Stream
       │
       ▼
 Monaco Editor
       │
       ▼
 Piston Execution
       │
       ▼
 Output
```

------------------------------------------------------------------------

# 🎥 Real-Time Communication Architecture

``` mermaid
flowchart TB

    SESSION["CODEXIA Session"]

    CALL["Stream Video Call"]
    CHAT["Stream Chat Channel"]

    USER1["Host"]
    USER2["Candidate"]

    SESSION --> CALL
    SESSION --> CHAT

    USER1 <--> CALL
    USER2 <--> CALL

    USER1 <--> CHAT
    USER2 <--> CHAT
```

------------------------------------------------------------------------

# 🎙️ Stream Token Flow

Private Stream credentials remain on the backend.

``` text
Frontend
    │
    │ Request token
    ▼
Express
    │
    ├── Verify Clerk User
    │
    ▼
Stream Server
    │
    ▼
Generated User Token
    │
    ▼
Frontend
    │
    ├── Video
    └── Chat
```

------------------------------------------------------------------------

# 💻 Coding Architecture

``` text
┌────────────────────────────────────┐
│          CODING WORKSPACE          │
├────────────────────────────────────┤
│                                    │
│  Problem Description               │
│                                    │
│  ┌──────────────────────────────┐  │
│  │        MONACO EDITOR         │  │
│  │                              │  │
│  │       function solve()       │  │
│  │       {                      │  │
│  │          ...                 │  │
│  │       }                      │  │
│  └──────────────────────────────┘  │
│                                    │
│            [ Run Code ]             │
│                                    │
│  ┌──────────────────────────────┐  │
│  │           OUTPUT             │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

------------------------------------------------------------------------

# ⚙️ Code Execution Flow

``` mermaid
sequenceDiagram

    actor User
    participant Editor as Monaco Editor
    participant Piston
    participant Runtime as Language Runtime
    participant Output

    User->>Editor: Write Code
    User->>Editor: Run
    Editor->>Piston: Source Code + Language
    Piston->>Runtime: Execute
    Runtime-->>Piston: stdout / stderr
    Piston-->>Editor: Execution Result
    Editor->>Output: Display Result
```

------------------------------------------------------------------------

# 🧪 Execution Pipeline

``` text
Code
 │
 ▼
Monaco Editor
 │
 ▼
Language Selection
 │
 ▼
Piston API
 │
 ▼
Language Runtime
 │
 ├──────────────┐
 ▼              ▼
stdout         stderr
 │              │
 └──────┬───────┘
        ▼
     Output UI
```

------------------------------------------------------------------------

# 🗄️ Database Architecture

``` mermaid
erDiagram

    USER ||--o{ SESSION : hosts
    USER ||--o{ SESSION : participates

    USER {
        ObjectId _id
        String clerkId
        String name
        String email
        String profileImage
        Date createdAt
        Date updatedAt
    }

    SESSION {
        ObjectId _id
        String problem
        String difficulty
        ObjectId host
        ObjectId participant
        String status
        String callId
        Date createdAt
        Date updatedAt
    }
```

------------------------------------------------------------------------

# 👤 User Data Flow

``` text
Clerk
  │
  │ clerkId
  ▼
MongoDB User
  │
  ├── name
  ├── email
  ├── profileImage
  │
  └── referenced by
          │
          ▼
       Sessions
```

------------------------------------------------------------------------

# 🧑‍💻 Session Data Flow

``` text
                 Session
                    │
       ┌────────────┼─────────────┐
       │            │             │
       ▼            ▼             ▼
     Host       Participant     Problem
       │            │             │
       └────────────┼─────────────┘
                    │
                    ▼
                 Status
                    │
                    ▼
                 callId
                    │
             ┌──────┴──────┐
             ▼             ▼
          Stream          Stream
          Video            Chat
```

------------------------------------------------------------------------

# 🔄 Backend Request Architecture

``` mermaid
flowchart LR

    UI["React Component"]
    QUERY["TanStack Query"]
    API["Axios"]
    ROUTE["Express Route"]
    AUTH["Clerk Middleware"]
    CONTROLLER["Controller"]
    MODEL["Mongoose"]
    DB[("MongoDB")]

    UI --> QUERY
    QUERY --> API
    API --> ROUTE
    ROUTE --> AUTH
    AUTH --> CONTROLLER
    CONTROLLER --> MODEL
    MODEL --> DB
    DB --> MODEL
    MODEL --> CONTROLLER
    CONTROLLER --> ROUTE
    ROUTE --> API
```

------------------------------------------------------------------------

# 🧠 Frontend Architecture

``` text
frontend/src
│
├── pages
│   ├── HomePage
│   ├── DashboardPage
│   ├── ProblemsPage
│   ├── ProblemPage
│   └── SessionPage
│
├── components
│   ├── Navbar
│   ├── ActiveSessions
│   ├── RecentSessions
│   ├── CreateSessionModal
│   ├── ProblemDescription
│   ├── CodeEditorPanel
│   ├── OutputPanel
│   └── VideoCallUI
│
├── hooks
│   ├── useSessions
│   └── useStreamClient
│
├── api
│   └── sessions
│
├── lib
│   ├── axios
│   ├── piston
│   ├── stream
│   └── utils
│
└── data
    └── problems
```

------------------------------------------------------------------------

# 🏢 Backend Architecture

``` text
backend/src
│
├── server.js
│
├── routes
│   ├── sessionRoute
│   └── chatRoutes
│
├── controllers
│   ├── sessionController
│   └── chatController
│
├── middleware
│   └── protectRoute
│
├── models
│   ├── User
│   └── Session
│
└── lib
    ├── db
    ├── env
    ├── stream
    └── inngest
```

------------------------------------------------------------------------

# 🧱 Backend Layering

``` text
                   HTTP Request
                         │
                         ▼
                  ┌────────────┐
                  │   Routes   │
                  └─────┬──────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ Middleware  │
                 └──────┬──────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ Controllers │
                 └──────┬──────┘
                        │
                        ▼
                 ┌─────────────┐
                 │   Models    │
                 └──────┬──────┘
                        │
                        ▼
                    MongoDB
```

------------------------------------------------------------------------

# 🔌 Service Responsibility Matrix

  Service              Responsibility
  -------------------- -----------------------------
  **React**            User interface
  **Vite**             Frontend build tooling
  **React Router**     Navigation
  **TanStack Query**   Server-state management
  **Clerk**            Authentication + identity
  **Express**          REST API
  **MongoDB**          Persistent application data
  **Mongoose**         Database modeling
  **Inngest**          Event-driven workflows
  **Stream**           Video + chat
  **Monaco**           Code editor
  **Piston**           Code execution

------------------------------------------------------------------------

# 🌐 Complete Data Flow

``` text
                         USER
                          │
                          ▼
                    React Frontend
                          │
            ┌─────────────┼──────────────┐
            │             │              │
            ▼             ▼              ▼
         Clerk         Express        Stream
         Auth            API         Video/Chat
                          │
                    ┌─────┴─────┐
                    ▼           ▼
                 MongoDB     Inngest
                    │
                    ▼
                 Sessions

                    Monaco
                       │
                       ▼
                    Piston
                       │
                       ▼
                  Code Output
```

------------------------------------------------------------------------

# 🗺️ Complete User Journey

``` mermaid
flowchart TD

    HOME["🏠 Home"]
    AUTH["🔐 Clerk Authentication"]
    SYNC["⚡ Inngest User Sync"]
    DASH["📊 Dashboard"]
    CREATE["➕ Create Session"]
    JOIN["🤝 Join Session"]
    ROOM["💻 Interview Room"]
    PROBLEM["📚 Problem"]
    EDITOR["⌨️ Monaco Editor"]
    VIDEO["🎥 Stream Video"]
    CHAT["💬 Stream Chat"]
    EXEC["⚙️ Piston"]
    OUTPUT["📤 Output"]
    COMPLETE["✅ Completed"]

    HOME --> AUTH
    AUTH --> SYNC
    SYNC --> DASH

    DASH --> CREATE
    DASH --> JOIN

    CREATE --> ROOM
    JOIN --> ROOM

    ROOM --> PROBLEM
    ROOM --> EDITOR
    ROOM --> VIDEO
    ROOM --> CHAT

    EDITOR --> EXEC
    EXEC --> OUTPUT

    ROOM --> COMPLETE
```

------------------------------------------------------------------------

# 🔐 Security Architecture

``` text
                      SECURITY
                         │
       ┌─────────────────┼──────────────────┐
       │                 │                  │
       ▼                 ▼                  ▼
     Clerk            Express             Stream
       │                 │                  │
       │                 │                  │
 Authentication      Protected API      User Tokens
 Credentials         Middleware
 Identity            Authorization
```

### Security boundaries

``` text
Frontend
   │
   ├── Publishable configuration
   └── User session

Backend
   │
   ├── Database credentials
   ├── Stream secret
   ├── Inngest credentials
   └── Protected APIs
```

Sensitive credentials remain server-side.

------------------------------------------------------------------------

# 📁 Complete Repository Structure

``` text
CODEXIA/
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── controllers/
│       │   ├── chatController.js
│       │   └── sessionController.js
│       ├── lib/
│       │   ├── db.js
│       │   ├── env.js
│       │   ├── inngest.js
│       │   └── stream.js
│       ├── middleware/
│       │   └── protectRoute.js
│       ├── models/
│       │   ├── User.js
│       │   └── Session.js
│       └── routes/
│           ├── chatRoutes.js
│           └── sessionRoute.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api/
│       │   └── sessions.js
│       ├── components/
│       ├── data/
│       ├── hooks/
│       ├── lib/
│       └── pages/
│
└── package.json
```

------------------------------------------------------------------------

# ⚡ Tech Stack

## Frontend

-   React
-   Vite
-   React Router
-   TanStack Query
-   Axios
-   Tailwind CSS
-   DaisyUI
-   Monaco Editor
-   Clerk React

## Backend

-   Node.js
-   Express.js
-   Mongoose
-   Clerk
-   Inngest

## Database

-   MongoDB

## Real-Time

-   Stream Video
-   Stream Chat

## Code Execution

-   Piston

------------------------------------------------------------------------

# 📡 API Architecture

## Session APIs

``` text
POST   /api/sessions
GET    /api/sessions/active
GET    /api/sessions/my-recent
GET    /api/sessions/:id
POST   /api/sessions/:id/join
POST   /api/sessions/:id/end
```

## Communication

``` text
GET    /api/chat/token
```

## Workflow

``` text
/api/inngest
```

## Health

``` text
GET    /health
```

------------------------------------------------------------------------

# 📈 Session State Machine

``` mermaid
stateDiagram-v2

    [*] --> ACTIVE: Create Session
    ACTIVE --> ACTIVE: Candidate Joins
    ACTIVE --> COMPLETED: Host Ends Session
    COMPLETED --> [*]
```

------------------------------------------------------------------------

# 🧠 Architectural Design Principles

### Separation of Concerns

Each service owns a clearly defined responsibility.

### Authentication Isolation

Authentication is delegated to Clerk instead of being implemented inside
the application database.

### Persistent State Isolation

MongoDB stores application state rather than authentication credentials
or real-time media.

### Real-Time Service Isolation

Video and chat are handled by Stream rather than being implemented
directly inside Express.

### Execution Isolation

User code is sent to Piston rather than executed inside the main
application process.

### Event-Driven Synchronization

Inngest handles asynchronous user lifecycle synchronization.

------------------------------------------------------------------------

# 🚀 Future Architecture

``` text
                         CODEXIA
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Interview      Evaluation     Problem
             Room          Engine        Engine
              │             │             │
              ▼             ▼             ▼
        Collaborative     Scoring       Problem
           Editor         System       Repository
              │
              ▼
         WebSocket /
            CRDT
```

Potential extensions:

-   Real-time collaborative editor
-   Interview recording
-   Candidate evaluation
-   Automated scoring
-   Hidden test cases
-   Interview history
-   Problem management
-   Admin dashboard
-   Redis caching
-   Rate limiting
-   Dedicated execution workers
-   Analytics
-   Observability

------------------------------------------------------------------------

# 🌟 Engineering Highlights

``` text
Full-Stack Architecture
        +
Authentication
        +
REST APIs
        +
Database Modeling
        +
Event-Driven Workflows
        +
Real-Time Communication
        +
Remote Code Execution
        +
Interactive Code Editing
        +
Service Integration
```

------------------------------------------------------------------------

# 🏁 CODEXIA

## Code. Collaborate. Interview.

> A unified technical interview environment where interviewers and
> candidates can communicate, solve problems, write code, execute
> solutions, and collaborate without leaving the interview workspace.

``` text
                    CODEXIA
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       CREATE         CODE       COLLABORATE
          │            │            │
          └────────────┼────────────┘
                       ▼
                    EXECUTE
                       │
                       ▼
                    EVALUATE
                       │
                       ▼
                    COMPLETE
```

**One session. One workspace. One complete technical interview.**
