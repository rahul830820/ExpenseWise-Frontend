"use client"

import { useEffect, useState } from "react"

interface Category {
  id: number
  name: string
}
export default function CategoriesPage() {
  const [categories, setCategories] =
  useState<Category[]>([])

  const [name, setName] = useState("")

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [editingCategoryId, setEditingCategoryId] =
  useState<number | null>(null)

  useEffect(() => {
  fetchCategories()
  }, [])

  const fetchCategories = async () => {
  try {
    const token =
      localStorage.getItem("access_token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    setCategories(data.items)
  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
  const createCategory = async () => {
  try {
    const token =
      localStorage.getItem("access_token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.detail ||
        "Failed to create category"
      )
    }

    setName("")

    fetchCategories()
  } 
  catch (error: any) {
  console.error(error)
  alert(error.message)
}
}
  const updateCategory = async () => {
  try {
    const token =
      localStorage.getItem("access_token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${editingCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to update category"
      )
    }

    setEditingCategoryId(null)
    setName("")

    fetchCategories()
  } catch (error) {
    console.error(error)
  }
}
  const deleteCategory = async (
  categoryId: number
) => {
  try {
    const token =
      localStorage.getItem("access_token")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
   const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail ||
      "Failed to delete category"
    )
  }

  fetchCategories()
  } catch (error) {
    console.error(error)
  }
}
  const handleEdit = (
  category: Category
) => {
  setEditingCategoryId(category.id)
  setName(category.name)
}
  const cancelEdit = () => {
  setEditingCategoryId(null)
  setName("")
}
  if (loading) {
  return <div>Loading...</div>
}

if (error) {
  return <div>{error}</div>
}
  return (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">
      Categories
    </h1>
    <div className="bg-white p-6 rounded-lg shadow mb-6">
  <div className="flex gap-4">
    <input
      className="border p-2 rounded flex-1"
      placeholder="Category Name"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
    />

    <button
      onClick={() => {
  if (editingCategoryId) {
    updateCategory()
  } else {
    createCategory()
  }
}}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {editingCategoryId
  ? "Update Category"
  : "Add Category"}
    </button>
    {editingCategoryId && (
  <button
    onClick={cancelEdit}
    className="bg-gray-500 text-white px-4 py-2 rounded"
  >
    Cancel
  </button>
)}
  </div>
</div>
    <table className="w-full bg-white rounded-lg shadow">
      <thead>
        <tr className="border-b">
          <th className="p-4 text-left">
            ID
          </th>

          <th className="p-4 text-left">
            Name
          </th>
          <th className="p-4 text-left">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {categories.map((category) => (
          <tr
            key={category.id}
            className="border-b"
          >
            <td className="p-4">
              {category.id}
            </td>

            <td className="p-4">
              {category.name}
            </td>
            <td className="p-4">
              <button
                onClick={() => handleEdit(category)}
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete this category?"
                    )
                  ) {
                    deleteCategory(category.id)
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}
