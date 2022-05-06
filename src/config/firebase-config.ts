import * as admin from 'firebase-admin';

console.log(process.env.PROJECT_ID)
console.log(process.env.PRIVATE_KEY)
admin.initializeApp({
	credential: admin.credential.cert(
		{
			projectId: process.env.PROJECT_ID,
			privateKey: process.env.PRIVATE_KEY,
			clientEmail: process.env.CLIENT_EMAIL
		}
		
	),
});

export default admin;
