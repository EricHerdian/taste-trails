"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RecipeProps } from "@/types";
import { fetchListOfRecipes, fetchRecipe } from "@/utils/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LIMIT = 30;

export default function Recipes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipeList, setRecipeList] = useState<RecipeProps[]>([]);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const currentPage = parseInt(searchParams?.get("page") || "1");
  const currentSearch = searchParams?.get("recipe") || "";

  useEffect(() => {
    if (!currentPage || !currentSearch) {
      router.replace("/recipe-list?page=1");
    }
  }, [currentPage, currentSearch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (currentSearch) {
        const data = await fetchRecipe(currentSearch);
        setRecipeList(data.recipes || []);
        setTotalRecipes(data.total || 0);
        setLoading(false);
      } else {
        const skip = (currentPage - 1) * LIMIT;
        const data = await fetchListOfRecipes(skip, LIMIT);
        setRecipeList(data.recipes || []);
        setTotalRecipes(data.total || 0);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, currentSearch]);

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

  const handleSearch = (recipeName: string) => {
    router.push(`/recipe-list?recipe=${recipeName}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      handleSearch(e.target.value);
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="ml-6">Loading...</div>
      ) : (
        <div>
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Recipe List
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-[300px] md:w-[400px] p-2 text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
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
            {totalPages > 1 && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
