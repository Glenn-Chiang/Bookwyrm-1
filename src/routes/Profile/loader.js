import getBooks from "../../crudFunctions/getBooks";

export const loader = async ({ params }) => {
    try {
      const userId = params.userId;
      const userBooks = await getBooks(userId);
      return userBooks;
    } catch (error) {
      console.log('Error loading Profile data', error);
    }
  }