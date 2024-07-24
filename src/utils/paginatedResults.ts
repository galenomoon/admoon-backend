export function paginatedResults(page = 1, data: [], perPage = 10) {
  const currentPage = page || 1;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  let results = {
    totalPages: Math.ceil(data.length / perPage),
    totalItems: data.length,
    currentPage: currentPage,
    results: data.slice(startIndex, endIndex)
  };

  return results;
}