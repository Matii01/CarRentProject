import config from "../../config";
import { useGetContactPageQuery } from "../api/contentManagement";

export async function contactLoader() {
  // const { data: contact, error, isLoding } = useGetContactPageQuery();
  const data = await fetch(`${config.API_URL}/ContentManagement/contact`).then(
    (res) => res.json()
  );

  return { data };
}
