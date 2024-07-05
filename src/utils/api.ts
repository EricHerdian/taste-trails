export async function fetchListOfRecipes(skip: number, limit: number) {
  try {
    const apiResponse = await fetch(
      `https://dummyjson.com/recipes?skip=${skip}&limit=${limit}`
    );
    const data = await apiResponse.json();

    return {
      recipes: data?.recipes,
      total: data?.total,
    };
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function fetchRecipe(recipeName: string) {
  try {
    const apiResponse = await fetch(
      `https://dummyjson.com/recipes/search?q=${recipeName}`
    );
    const data = await apiResponse.json();

    return data;
  } catch (e) {
    throw new Error(e as string);
  }
}
