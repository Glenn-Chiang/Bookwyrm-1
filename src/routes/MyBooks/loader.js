import getBooks from "../../crudFunctions/getBooks";

export const loader = async ({ params }) => {
    try {
      const userId = params.userId;
      console.log(userId)
      const userBooks = await getBooks(userId);
      return userBooks;
    } catch (error) {
      console.log('Error retrieving books:', error);
    }
}