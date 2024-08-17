import { Client, Account, ID } from 'react-native-appwrite';

export const config = {
    endpoint: "http://192.168.1.69/v1/",
    platform: 'com.local.aora',
    projectId: '66bfdc22002bba46a707',
    databaseId: '66bfddd8000a49480d66',
    userCollectionId: '66bfddff0022b5e0f6df',
    videoCollectionId: '66bfde17003bb985e25f',
    storageId: '66bfdf80000db9808aa7'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


const account = new Account(client);

export const createUser = () => {
    // Register User
    account.create({userId: ID.unique(), name: 'Jane Doe', email:'me@example.com', phone: '0123456789', password:'password'})
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
            alert('Error: ' + error.message);
        });
}