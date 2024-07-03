"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RecipeProps } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LIMIT = 30;

async function fetchListOfRecipes(skip: number, limit: number) {
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

export default async function Recipes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipeList, setRecipeList] = useState<RecipeProps[]>([]);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  useEffect(() => {
    if (!pageParam) {
      router.replace("/recipe-list?page=1");
    }
  }, [pageParam]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const skip = (currentPage - 1) * LIMIT;
      const data = await fetchListOfRecipes(skip, LIMIT);
      setRecipeList(data.recipes || []);
      setTotalRecipes(data.total || 0);
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalRecipes / LIMIT);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      router.push(`/recipe-list?page=${nextPage}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      router.push(`/recipe-list?page=${prevPage}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-8 md:text-3xl sm:text-2xl font-bold text-gray-800 ">
        Recipe List
      </h2>
      {loading ? (
        <div className="ml-6">Loading...</div>
      ) : (
        <div className="mx-auto lg:max-w-6xl md:max-w-2xl sm:max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipeList && recipeList.length > 0 ? (
              recipeList.map((recipe: RecipeProps) => {
                return (
                  <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                    <Card>
                      <CardContent className="bg-red-300 p-5 rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.025] transition-all">
                        <div className="w-full aspect-w-16 aspect-h-8">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                        <div className="px-2 mt-4 flex flex-col">
                          <h3 className="mb-4 text-lg font-bold text-gray-900">
                            {recipe.name}
                          </h3>
                          <div className="text-right">
                            <p className="text-lg text-gray-600 font-bold">
                              {recipe.cuisine}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <p>No recipes found</p>
            )}
          </div>
          <div className="mt-8 flex justify-center items-center">
            {currentPage > 1 ? (
              <button
                className="px-4 py-2 mr-4 w-32 bg-black text-white rounded-md"
                onClick={handlePrevPage}
              >
                Previous
              </button>
            ) : (
              <button
                className="px-4 py-2 mr-4 w-32 bg-gray-600 text-gray-white rounded-md cursor-not-allowed"
                disabled
              >
                Previous
              </button>
            )}
            <div className="flex flex-row gap-x-1">
              <p className="font-bold">{currentPage}</p>
              <p>/ </p>
              <p>{totalPages}</p>
            </div>
            {currentPage < totalPages ? (
              <button
                className="px-4 py-2 ml-4 w-32 bg-black text-white rounded-md"
                onClick={handleNextPage}
              >
                Next
              </button>
            ) : (
              <button
                className="px-4 py-2 ml-4 w-32 bg-gray-600 text-white rounded-md cursor-not-allowed"
                disabled
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
