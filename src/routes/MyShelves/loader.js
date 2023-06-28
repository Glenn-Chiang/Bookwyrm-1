import getBooks from "../../crudFunctions/getBooks";
import getShelves from "../../crudFunctions/getShelves";

export const loader = async ({ params }) => {
    try {
      const userId = params.userId;
      const userBooks = await getBooks(userId);
      const userShelves = await getShelves(userId);
      return { userBooks, userShelves };
    } catch (error) {
      console.log('Error loading MyShelves', error);
    }
  }