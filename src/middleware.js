export { default } from 'next-auth/middleware';

// applies next-auth only to matching routes - can be regex
// ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/portal'] };