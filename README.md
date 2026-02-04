# Valentine Timeline App

## Instant Start

```bash
# Install dependencies for both frontend and backend
npm install
cd server && npm install && cd ..

# Start backend (in one terminal)
cd server && npm start

# Start frontend (in another terminal)
npm run dev
```

Then open http://localhost:5173 in your browser.

## Running the Application

### Start Backend Server
```bash
cd server
npm start
```
Server will run on: http://localhost:3001

### Start Frontend
```bash
npm run dev
```
Frontend will run on: http://localhost:5173

## Important Notes
- Make sure to start the backend server FIRST before opening the frontend
- Backend must be running for the timeline to save/load data from MongoDB
- Images are saved as Base64 strings in the database
