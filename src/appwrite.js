import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

console.log('Appwrite Config:', {
  PROJECT_ID,
  DATABASE_ID,
  COLLECTION_ID
});

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    console.log('Attempting to update search count for:', searchTerm);
    
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ])

    if(result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      })
      console.log('Updated existing search term');
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title
      })
      console.log('Created new search term document');
    }
  } catch (error) {
    console.error('Appwrite error details:', error);
    // Don't throw - let the app continue working even if Appwrite fails
  }
}

export const getTrendingMovies = async () => {
  try {
    console.log('Fetching trending movies...');
    
    // Add a small delay to ensure platform setup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ])

    console.log('Trending movies result:', result);
    return result.documents || [];
  } catch (error) {
    console.log('Trending movies not available (this is normal for new setups)');
    return []; // Return empty array instead of undefined
  }
}