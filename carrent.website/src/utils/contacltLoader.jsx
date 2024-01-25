import config from "../../config";

export async function contactLoader() {
  const data = await fetch(`${config.API_URL}/ContentManagement/contact`).then(
    (res) => res.json()
  );

  return { data };
}
