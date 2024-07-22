import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

function FilterByCategory() {
  const { dispatch } = useBudget();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const categoryId = event.target.value;
    dispatch({ type: "ADD_FILTER_CATEGORY", payload: { id: categoryId } });
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">-- Todas las Categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default FilterByCategory;
