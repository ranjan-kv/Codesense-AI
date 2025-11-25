# MongoDB Setup Instructions

## Important: Update Your MongoDB Password

The MongoDB connection string provided in the project needs to be updated with your actual database password.

### Steps:

1. **Get your MongoDB connection string**:
   ```
   mongodb+srv://ranjankumarv67:<db_password>@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   ```

2. **Replace `<db_password>`** with your actual MongoDB Atlas database password.

3. **Update the `.env` file** in `backend/node/.env`:
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_ACTUAL_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   ```

4. **Make sure your IP is whitelisted** in MongoDB Atlas:
   - Go to MongoDB Atlas Dashboard
   - Click "Network Access"
   - Add your current IP address (or use 0.0.0.0/0 for development - NOT recommended for production)

5. **Verify database user permissions**:
   - Go to "Database Access"
   - Ensure your user has "Read and write to any database" permissions

## Testing the Connection

After updating the connection string, test it by starting the Node.js backend:

```bash
cd backend/node
npm start
```

You should see: `MongoDB connected` in the console.

If you see connection errors:
- Double-check the password
- Verify IP whitelist
- Check user permissions
- Ensure the cluster is running

