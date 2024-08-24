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

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.


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

    try {
        const session = await account.createEmailPasswordSession(email, password)
        console.log('login session: ', session.$id)
        return session
        
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * Retrieves the current user by fetching the current account and finding the corresponding user document in the database.
 *
 * @return {Promise<Object>} The user document representing the current user.
 * @throws {Error} If no account is found or no user is found.
 */
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error('No account found')

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error('No user found')

        return currentUser.documents[0]
        
    } catch (error) {
        console.error(error)
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
