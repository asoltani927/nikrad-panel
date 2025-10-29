# Middleware Usage Guide

This folder contains authentication middleware for your Fastify application.

## Available Middleware

### 1. `authMiddleware`
Protects routes by requiring authentication. Only authenticated users can access routes with this middleware.

### 2. `guestMiddleware`
Ensures users are NOT authenticated. Useful for routes like login/register that should only be accessible to unauthenticated users.

## Usage Examples

### Protecting a Single Route

```typescript
import { FastifyInstance } from 'fastify';
import { authMiddleware } from '@/middlewares';

export const protectedRoute = async (app: FastifyInstance) => {
  app.get('/api/profile', { 
    preHandler: authMiddleware 
  }, async (request, reply) => {
    // request.user is now available and guaranteed to exist
    return { 
      user: request.user,
      message: 'This is a protected route' 
    };
  });
};
```

### Guest-Only Route

```typescript
import { FastifyInstance } from 'fastify';
import { guestMiddleware } from '@/middlewares';

export const loginRoute = async (app: FastifyInstance) => {
  app.post('/api/login', { 
    preHandler: guestMiddleware 
  }, async (request, reply) => {
    // Only accessible to non-authenticated users
    return { message: 'Login successful' };
  });
};
```

### Multiple Middleware

```typescript
import { FastifyInstance } from 'fastify';
import { authMiddleware } from '@/middlewares';

export const multiMiddlewareRoute = async (app: FastifyInstance) => {
  app.post('/api/admin', { 
    preHandler: [authMiddleware, adminCheckMiddleware] 
  }, async (request, reply) => {
    return { message: 'Admin only route' };
  });
};
```

### Protecting All Routes in a Plugin

```typescript
import { FastifyInstance } from 'fastify';
import { authMiddleware } from '@/middlewares';

export const userModule = async (app: FastifyInstance) => {
  // Apply middleware to all routes in this plugin
  app.addHook('preHandler', authMiddleware);
  
  app.get('/api/users/me', async (request, reply) => {
    return { user: request.user };
  });
  
  app.put('/api/users/me', async (request, reply) => {
    // Update user
    return { success: true };
  });
};
```

## Implementation Notes

The middleware functions currently contain placeholder logic. You need to:

1. **Implement token validation** - Replace the TODO comments with your actual authentication logic (JWT, Privy, etc.)
2. **Add necessary fields to Prisma schema** - If using Privy or another provider, add fields like `privyId` to your User model
3. **Configure authentication service** - Set up JWT secrets, Privy configuration, etc. in your environment variables

## TypeScript Support

The User type is automatically available on `request.user` thanks to the type declarations in `types/fastify.d.ts`.

