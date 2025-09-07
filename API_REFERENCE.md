# Subscription Tracking App - API Reference

## Overview

This document outlines all API endpoints for the subscription tracking application.

## Authentication Endpoints

### Email/Password Auth

```
POST   /auth/login
POST   /auth/register
POST   /auth/logout
POST   /auth/refresh-token
GET    /auth/me
```

### OAuth Endpoints

```
GET    /auth/google
GET    /auth/google/callback
POST   /auth/github          # Future OAuth providers
GET    /auth/github/callback
```

## User Management

```
GET    /users/profile
PUT    /users/profile
DELETE /users/account
GET    /users/oauth-accounts
DELETE /users/oauth-accounts/:provider
```

## Subscriptions Management

```
GET    /subscriptions
POST   /subscriptions
GET    /subscriptions/:id
PUT    /subscriptions/:id
DELETE /subscriptions/:id
GET    /subscriptions/:id/payments  # Removed - no payments functionality
PUT    /subscriptions/:id/status
POST   /subscriptions/:id/renew
```

## Categories Management

```
GET    /categories
POST   /categories
GET    /categories/:id
PUT    /categories/:id
DELETE /categories/:id
GET    /categories/:id/subscriptions
```

## Dashboard & Analytics

```
GET    /dashboard/summary
GET    /dashboard/monthly-spending     # Updated - no actual payments
GET    /dashboard/category-breakdown
GET    /dashboard/upcoming-renewals
GET    /dashboard/recent-activity
```

## Health Check

```
GET    /health
```

## Request/Response Examples

### Create Subscription

```json
POST /subscriptions
{
  "name": "Netflix",
  "description": "Streaming service",
  "cost": 15.99,
  "currency": "USD",
  "billingCycle": "monthly",
  "startDate": "2024-01-01",
  "categoryId": "uuid"
}
```

### Get Dashboard Summary

```json
GET /dashboard/summary
{
  "totalSubscriptions": 12,
  "activeSubscriptions": 10,
  "monthlySpending": 89.97,
  "upcomingRenewals": 3,
  "recentActivity": [...]
}
```

## Data Types

### TypeScript Types

```typescript
export type BillingCycle = 'monthly' | 'yearly' | 'weekly' | 'daily';
export type SubscriptionStatus = 'active' | 'cancelled' | 'paused' | 'expired';
```

### Database Enums

```sql
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly', 'weekly', 'daily');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'paused', 'expired');
```

## Implementation Notes

1. **Authentication**: Use JWT tokens for protected routes
2. **Validation**: Use class-validator for request validation
3. **Pagination**: Implement for list endpoints
4. **Filtering**: Add query params for filtering (status, date range, etc.)
5. **Sorting**: Allow sorting by date, amount, name
6. **Rate Limiting**: Implement for auth endpoints
7. **Caching**: Consider Redis for dashboard data

## Removed Features

- Payment processing functionality
- Payment tracking and history
- Refund management
- Payment method storage

## Future Enhancements

- Email notifications for upcoming renewals
- Subscription cost analysis and trends
- Export functionality (CSV/PDF)
- Mobile app API support
- Webhook integrations with subscription services
