import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "http://192.168.1.69/v1",
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


const account = new Account(client); // this connects to auth 
const avatars = new Avatars(client);

const databases = new Databases(client)


export const createUser =  async(email, password, username) => {
    try {
        const  newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        
        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)
        
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

}

export const signIn = async(email, password) => {

    try {
        const session = await account.createEmailPasswordSession(email, password)
        console.log('login session: ', session.$id)
        return session
        
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error('No account found')

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error('No user found')

        return currentUser.documents[0]
        
    } catch (error) {
        console.error(error)
    }
}
