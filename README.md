# Frontend Chatbot - PAI (Personal AI)

This is the **frontend** of the WebAI project, built with [Next.js](https://nextjs.org/) and React.  
It provides the user interface for interacting with the AI chatbot powered by a **FastAPI backend** (separate repo: [backend_chatbot](https://github.com/BobKeijzer/backend_chatbot)).

The frontend supports:

- Creating and managing chat sessions  
- Sending messages to the backend AI  
- Uploading files and folders for RAG workflows  
- Viewing chat history and responses  
- Dark mode and responsive layout  

The project was created for **learning purposes**, focusing on Next.js + React responsive frontend, handling of dynamic data, states & API calls to backend and more.

## Features

- **Next.js 13** app using app directory & SSR  
- **React hooks** for state management (chats, files, etc.)  
- **File & folder uploads** integrated with backend RAG indexing  
- **Sidebar navigation** for chats and documents  
- **Theme support** with dark/light mode 
- **Components** mostly from [shadcn](https://ui.shadcn.com/) 

## Getting Started

### Prerequisites

- Node.js v22.19.0  
- [pnpm](https://pnpm.io/) v10.15.1  

### Installation
```bash
git clone https://github.com/BobKeijzer/frontend_chatbot.git
cd frontend_chatbot

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the root (ignored by git):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

In [Vercel](https://vercel.com), set env variables through project settings instead of using `.env`.

### Running Locally

```bash
pnpm dev
```

Frontend will be available at:
[http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
pnpm build
pnpm start
```

## Deployment Plans

* Frontend hosted on **Vercel** (Next.js SSR support) 
* Connects to **FastAPI backend** (Azure App Services container or code) 

## License

MIT – free for learning and experimentation 

## Screenshots of page
This is the frontend for my chatbot project showing example usage.
![Example Part 1](public/Demo1.png)
![Example Part 2](public/Demo2.png)
![Example Part 3](public/Demo3.png)