export async function contactLoader() {
  const data = await fetch(
    "https://localhost:7091/ContentManagement/contact"
  ).then((res) => res.json());

  return { data };
}
