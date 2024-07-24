export function paginatedResults(page = 1, data: [], perPage = 10) {
  const currentPage = page || 1;
  const limit = !isNaN(Number(perPage)) && (perPage > 0) ? Number(perPage) : 10;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;

  let results = {
    totalPages: Math.ceil(data.length / limit),
    totalItems: data.length,
    currentPage: currentPage,
    results: data.slice(startIndex, endIndex)
  };

  return results;
}