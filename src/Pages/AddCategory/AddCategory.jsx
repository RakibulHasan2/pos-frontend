import { useState } from "react";
import CommonTopNab from "../../Shared/CommonTopNav/CommonTopNab";
import toast from "react-hot-toast";
import useGetData from "../../Hooks/useGetData";
import axios from "axios";


export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const {data: categoriesData, isLoading: tableLoading,refetch} = useGetData("http://localhost:5000/api/category/getCategories");

  const { data: productsData } = useGetData("http://localhost:5000/api/products/getProduct");

  const enrichedCategories = categoriesData?.categories?.map((category) => {
    const productsInCategory = productsData?.products?.filter(
      (product) => product.p_category === category.category_name
    );
    const brandsInCategory = [
      ...new Set(productsInCategory?.map((product) => product.p_brand)),
    ];

    return {
      ...category,
      productCount: productsInCategory?.length || 0,
      brandCount: brandsInCategory?.length || 0,
    };
  });

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/category/crate-category",
        {
          category_name: categoryName,
        }
      );

      if (response.status === 201) {
        toast.success("Category added successfully!");
        setCategoryName("");
        refetch(); // Refresh the table data
      } else {
        toast.error("Failed to add category. Please try again.");
      }
    } catch {
      toast.error("Category Already Exists. Please Change the Name.");
    } finally {
      setLoading(false);
    }
  };

  if (tableLoading) {
    return <div className="text-center mt-10">Loading table data...</div>;
  }

  return (
    <div>
      <CommonTopNab />
      <div className="p-5">
        <div className="w-full border border-blue-500 rounded-2xl p-5">
          <h2 className="text-2xl font-bold mb-5">Add Category</h2>
          <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="category_name" className="font-medium mb-2">
                Category Name:
              </label>
              <input
                id="category_name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="input border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>
      </div>
      <div className="p-5">
        <div className="w-full min-h-screen border border-blue-500 rounded-2xl p-5">
          <h2 className="text-2xl font-bold mb-5">Products Category Table</h2>

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">Category Name</th>
                <th className="border border-gray-300 px-4 py-2">Products Count</th>
                <th className="border border-gray-300 px-4 py-2">Brands Count</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {enrichedCategories?.map((category) => (
                <tr key={category._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.category_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.productCount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.brandCount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
