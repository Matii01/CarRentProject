export async function contactLoader() {
  const data = await fetch(
    "https://localhost:7091/ContentManagement/footer"
  ).then((res) => res.json());

  return { data };
}
