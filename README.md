# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
<br />
Backend Changes: Modify the backend to send a hash of the data along with data 
<br />

Frontend Changes: Store this hash on the frontend. When verifyingm compute the hash of the current data and compare it with the stored hash
<br />

Note: To prevent data tempering, a secure server-side validatiaon or implementing SSL to protect client's data.

**2. If the data has been tampered with, how can the client recover the lost data?**
<br />

Backend Changes: store multiple versions of the data on backend

Frontend Changes: add functionality to updateData function to fetch the last known good version of the data.
<br />

Note: Implement version control for the data on the server-side. Each time the data is updated, save a new version instead of overwriting the existing data. This way, if the current version of the data is tampered with, you can revert to a previous version.


### To run the apps:
```npm run start``` in both the frontend and backend

