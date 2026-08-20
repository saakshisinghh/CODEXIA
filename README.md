# ⌘⟨/⟩ CODEXIA
Code. Collaborate. Interview.

A full-stack collaborative coding interview platform that brings technical problem solving, live coding, remote code execution, video communication, and real-time chat into a single interview workspace.

💻 Collaborative Coding
🎥 Real-Time Interviews
💬 Integrated Communication
⚙️ Remote Code Execution
🔐 Secure Authentication
⚡ Event-Driven Architecture
🌐 The Problem

Technical interviews often require multiple disconnected tools.

A typical interview involves:

Video Meeting
      +
Coding Platform
      +
Code Compiler
      +
Chat
      +
Authentication
      +
Interview Management

This creates unnecessary context switching between interviewer and candidate.

The interviewer may need to:

Start a video call
Share a coding problem
Open a coding platform
Exchange code
Communicate through another application
Track the interview separately
💡 The Vision

CODEXIA brings the complete technical interview into one unified workspace.

                     CODEXIA
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
     Problem          Coding          Communication
        │               │                │
        ▼               ▼                ▼
     Problem         Monaco          Stream Video
     Engine          Editor          Stream Chat
                        │
                        ▼
                    Piston
                        │
                        ▼
                 Code Execution

Instead of switching between multiple platforms:

Create
   ↓
Join
   ↓
Discuss
   ↓
Code
   ↓
Execute
   ↓
Collaborate
   ↓
Complete

Everything happens inside the same interview session.

🚀 Why CODEXIA?

Traditional workflow:

Google Meet
     +
LeetCode
     +
Online Compiler
     +
WhatsApp / Slack

CODEXIA:

┌─────────────────────────────────────┐
│             CODEXIA                 │
│                                     │
│  Problem                            │
│  ─────────────────────────────      │
│                                     │
│  Monaco Editor       Video Call     │
│                                     │
│  Output              Chat           │
│                                     │
└─────────────────────────────────────┘
One platform.
One session.
One collaborative workspace.
🏗️ System Architecture
🧩 Architecture Layers

CODEXIA is organized into distinct architectural layers.

┌──────────────────────────────────────────────┐
│                 USER LAYER                   │
│                                              │
│ Browser / Interviewer / Candidate            │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              PRESENTATION LAYER              │
│                                              │
│ React • Router • Tailwind • Monaco           │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             STATE / API LAYER                │
│                                              │
│ TanStack Query • Axios                       │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              APPLICATION LAYER               │
│                                              │
│ Express • Routes • Middleware • Controllers  │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│               DATA LAYER                     │
│                                              │
│ Mongoose • MongoDB                           │
└──────────────────────────────────────────────┘


             External Intelligence
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
    Clerk          Stream        Piston
    Auth          Realtime       Execute
                     │
                  Inngest
                  Workflows
🔄 Complete Application Flow
🔐 Authentication Architecture

CODEXIA does not implement authentication manually.

Clerk acts as the identity provider.

🔑 Identity Architecture

The same user exists across multiple services, but each service has a different responsibility.

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
Clerk
Authentication
Identity
Credentials
Sessions
Verification
MongoDB
Application User
Interview Sessions
Host
Participant
Session State
Stream
Video
Chat
Realtime Communication
⚡ Inngest Event Architecture

Inngest is responsible for event-driven workflows.

The most important event is the user lifecycle.

👤 User Registration Flow
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

This creates a consistent identity across the platform.

🗑️ User Deletion Flow
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
📊 Dashboard Architecture

After authentication:

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
🧑‍💻 Interview Session Architecture

The session is the central entity connecting the interviewer and candidate.

🆕 Create Session Flow
🔗 Session Resource Mapping

The callId connects the application's session to Stream.

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

This prevents the application session and real-time communication resources from becoming unrelated entities.

👥 Join Session Flow
🧑‍🤝‍🧑 Interview Room Flow

Once both users are inside the session:

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
🎥 Real-Time Communication Architecture

Stream handles the communication layer.

🎙️ Stream Token Flow

Private Stream credentials never need to be exposed to the client.

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
💻 Coding Architecture

The coding workspace consists of:

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
⚙️ Code Execution Flow
🧪 Execution Pipeline
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
🗄️ Database Architecture
👤 User Data Flow
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
🧑‍💻 Session Data Flow
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
🔄 Backend Request Architecture

Every protected request follows a consistent pipeline.

🧠 Frontend Architecture
frontend/src
│
├── pages
│   │
│   ├── HomePage
│   ├── DashboardPage
│   ├── ProblemsPage
│   ├── ProblemPage
│   └── SessionPage
│
├── components
│   │
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
│   │
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
🏢 Backend Architecture
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
🧱 Backend Layering
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
🔌 Service Responsibility Matrix
Service	Responsibility
React	User interface
Vite	Frontend build tooling
React Router	Navigation
TanStack Query	Server-state management
Clerk	Authentication + identity
Express	REST API
MongoDB	Persistent application data
Mongoose	Database modeling
Inngest	Event-driven workflows
Stream	Video + chat
Monaco	Code editor
Piston	Code execution
🌐 Complete Data Flow
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
🗺️ Complete User Journey
🔐 Security Architecture
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
Security boundaries
Frontend
   │
   ├── Publishable configuration
   │
   └── User session
       
Backend
   │
   ├── Database credentials
   ├── Stream secret
   ├── Inngest credentials
   └── Protected APIs

Sensitive credentials remain server-side.

📁 Complete Repository Structure
CODEXIA/
│
├── backend/
│   ├── package.json
│   │
│   └── src/
│       ├── server.js
│       │
│       ├── controllers/
│       │   ├── chatController.js
│       │   └── sessionController.js
│       │
│       ├── lib/
│       │   ├── db.js
│       │   ├── env.js
│       │   ├── inngest.js
│       │   └── stream.js
│       │
│       ├── middleware/
│       │   └── protectRoute.js
│       │
│       ├── models/
│       │   ├── User.js
│       │   └── Session.js
│       │
│       └── routes/
│           ├── chatRoutes.js
│           └── sessionRoute.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── api/
│       │   └── sessions.js
│       │
│       ├── components/
│       ├── data/
│       ├── hooks/
│       ├── lib/
│       └── pages/
│
└── package.json
⚡ Tech Stack
Frontend
React
Vite
React Router
TanStack Query
Axios
Tailwind CSS
DaisyUI
Monaco Editor
Clerk React
Backend
Node.js
Express.js
Mongoose
Clerk
Inngest
Database
MongoDB
Real-Time
Stream Video
Stream Chat
Code Execution
Piston
📡 API Architecture
Session APIs
POST   /api/sessions
GET    /api/sessions/active
GET    /api/sessions/my-recent
GET    /api/sessions/:id
POST   /api/sessions/:id/join
POST   /api/sessions/:id/end
Communication
GET    /api/chat/token
Workflow
/api/inngest
Health
GET    /health
📈 Session State Machine
🧠 Architectural Design Principles
Separation of Concerns

Each service owns a clearly defined responsibility.

Authentication Isolation

Authentication is delegated to Clerk instead of being implemented inside the application database.

Persistent State Isolation

MongoDB stores application state rather than authentication credentials or real-time media.

Real-Time Service Isolation

Video and chat are handled by Stream rather than being implemented directly inside Express.

Execution Isolation

User code is sent to Piston rather than executed inside the main application process.

Event-Driven Synchronization

Inngest handles asynchronous user lifecycle synchronization.

🚀 Future Architecture

The current architecture can naturally evolve into a more scalable collaborative interview platform.

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

Potential extensions:

Real-time collaborative editor
Interview recording
Candidate evaluation
Automated scoring
Hidden test cases
Interview history
Problem management
Admin dashboard
Redis caching
Rate limiting
Dedicated execution workers
Analytics
Observability
🌟 Engineering Highlights

CODEXIA demonstrates the integration of multiple production-oriented concepts:

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
🏁 CODEXIA
Code. Collaborate. Interview.

A unified technical interview environment where interviewers and candidates can communicate, solve problems, write code, execute solutions, and collaborate without leaving the interview workspace.

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
