You are an expert in asynchronous programming in TypeScript.

# Task
Implement the following functionality using `async/await` and proper error handling.

# Context
- We use `Promise.all` for parallel operations where possible.
- We use `try/catch` blocks for error handling.
- We avoid "callback hell" or raw `.then()` chains unless necessary.

# Observables
- Use RxJS for observables.
- Use observables only for data streams, not one time operations or control flow.
- Use `switchMap` for sequential operations.
- Use `forkJoin` for parallel operations.
- Convert observables to promises when necessary.
- Convert promises to observables when necessary.

# Input
[Insert description of async task here]

# Output
- TypeScript code snippet.
- Explanation of concurrency model used (e.g., sequential vs parallel).
