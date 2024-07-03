async function fetchRecipeDetails(currentRecipeId: string) {
  try {
    const apiResponse = await fetch(
      `https://dummyjson.com/recipes/${currentRecipeId}`
    );
    const data = await apiResponse.json();

    return data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export default async function RecipeDetails({
  params,
}: {
  params: { details: string };
}) {
  const getRecipeDetails = await fetchRecipeDetails(params?.details);

  return (
    <div className="flex justify-center bg-red-300">
      <div className="p-6 lg:max-w-4xl sm:max-w-2xl bg-white shadow-md shadow-black">
        <div className="grid gap-5 md:w-3/5 sm:w-2/5">
          <div className="font-extrabold">
            <h2 className="text-4xl text-gray-950">{getRecipeDetails?.name}</h2>
            <div className="flex flex-row flex-wrap p-2 text-sm text-gray-600">
              <div>
                <p className="inline">{getRecipeDetails?.difficulty}</p>
                <p className="inline"> Difficulty</p>
              </div>
              <div className="border-l border-gray-400 h-5 mx-2" />
              <div>
                <p className="inline">{getRecipeDetails?.cuisine}</p>
                <p className="inline"> Cuisine</p>
              </div>
              {getRecipeDetails?.mealType &&
                getRecipeDetails.mealType.map(
                  (type: string) =>
                    !getRecipeDetails.tags.includes(type) && (
                      <div key={type} className="flex">
                        <div className="border-l border-gray-400 h-5 mx-2" />
                        <p>{type}</p>
                      </div>
                    )
                )}
              {getRecipeDetails?.tags &&
                getRecipeDetails.tags.map((tag: string) => (
                  <div key={tag} className="flex">
                    <div className="border-l border-gray-400 h-5 mx-2" />
                    <p>{tag}</p>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <img
              src={getRecipeDetails?.image}
              alt={getRecipeDetails?.name}
              className=" rounded object-cover"
            />
          </div>
          <div className="w-full grid gap-5 sm:grid-cols-1 lg:grid-cols-3 p-5 mb-5 bg-white rounded border-t-[12px] border-red-500 shadow-black shadow-sm">
            <div>
              <p className="font-bold">Prep Time: </p>
              <p>{getRecipeDetails?.prepTimeMinutes} minutes</p>
            </div>
            <div>
              <p className="font-bold">Cook Time: </p>
              <p>{getRecipeDetails?.prepTimeMinutes} minutes</p>
            </div>
            <div>
              <p className="font-bold">Total Time: </p>
              <p>
                {getRecipeDetails?.prepTimeMinutes +
                  getRecipeDetails?.cookTimeMinutes}{" "}
                minutes
              </p>
            </div>
            <div>
              <p className="font-bold">Servings: </p>
              <p>{getRecipeDetails?.servings}</p>
            </div>
            <div className="lg:col-span-2">
              <p className="font-bold">Calories (per serving): </p>
              <p>{getRecipeDetails?.caloriesPerServing}</p>
            </div>
          </div>
          <div className="pb-5">
            <h2 className="text-3xl text-gray-950 font-extrabold">
              Ingredients
            </h2>
            <ul className="grid gap-2 mt-5 ml-2 list-disc list-inside">
              {getRecipeDetails?.ingredients.map((ingredient: string) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="pb-5">
            <h2 className="text-3xl text-gray-950 font-extrabold">
              Instructions
            </h2>
            <div className="grid gap-5 mt-5 ml-2">
              {getRecipeDetails?.instructions.map(
                (instructions: string, index: number) => (
                  <div key={instructions}>
                    <p className="font-bold">Step {index + 1}</p>
                    <p>{instructions}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
