# Security Issues

1. **Use of `eval()`**
   - File: `app.js`
   - Code: `eval("console.log('This is insecure')")`
   - Severity: **High**
   - Risk: Allows arbitrary code execution, a common vector for attacks like Remote Code Execution (RCE).

2. **Missing Rate Limiting**
   - No protection against brute-force attacks on the `/login` route.

3. **Hardcoded Secrets**
   - Secrets (e.g., `JWT_SECRET`) are stored in `.env` and not secured in production (should use secret management services).

4. **JWT Without Expiry Check**
   - JWTs issued do not specify expiration (`exp`), making them potentially valid indefinitely.
