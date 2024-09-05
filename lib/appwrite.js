import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
export const config = {
    endpoint: process.env.API_ENDPOINT,
    platform: process.env.PLATFORM,
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
    userCollectionId: process.env.USER_COLLECTION_ID,
    videoCollectionId: process.env.VIDEO_COLLECTION_ID,
    storageId: process.env.STORAGE_ID
}

const {
endpoint,
platform,
projectId,
databaseId,
userCollectionId,
videoCollectionId,
storageId,
} = config

// Init your React Native SDK
const client = new Client();

// client.headers['X-Appwrite-Key'] = process.env.API_KEY;
client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.


const account = new Account(client); // this connects to auth 
const avatars = new Avatars(client);

const databases = new Databases(client)
console.log('account => ',account)


export const createUser =  async(email, password, username) => {
    try {
        console.log(email)
        const  newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        console.log(newAccount)
        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)
        
        await signIn(email, password)

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
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
    console.log('Sign in email =>', email)
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
        console.log('current Acc => ', currentAccount)
        if(!currentAccount) throw Error('No account found')

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error('No user found')

        return currentUser.documents[0]
        
    } catch (error) {
        console.error('error getting user => ',error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [ Query.contains ('title', query) ]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [ Query.equal ('creator', userId) ]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}


export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')

        return session
    } catch (error) {
        throw new Error(error)
    }
}
