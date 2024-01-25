import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import NotificationDetails from "./NotificationDetails";
import axiosInstance from "../../utils/axiosConfig";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";

function UserNotification() {
  const [items, setItems] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [params, setParams] = useState({
    CreatedStart: " ",
    CreatedEnd: "",
    IsRead: false,
  });

  useEffect(() => {
    const queryString = transformObjectToQueryString(params);
    axiosInstance
      .get(`Notification/myNotification?${queryString}`)
      .then((data) => {
        transformAndSetItems(data.data.items);
        setMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const transformAndSetItems = (items) => {
    const transformed = items.map((it) => ({
      ...it,
      createdDate: formDate(it.createdDate),
    }));
    setItems(transformed);
  };

  const formDate = (data) => {
    return data.slice(0, 10);
  };

  const doubleClick = (it) => {
    setSelectedItem(it);
    setShowDetails(true);
  };

  const removeItem = (id) => {
    const list = items.filter((it) => it.id != id);
    setItems(list);
  };

  return (
    <>
      <>
        {!showDetails && (
          <Card>
            <Card.Header className="cardHeader">Notification</Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((it) => (
                      <tr key={it.id} onDoubleClick={() => doubleClick(it)}>
                        <td>{it.id}</td>
                        <td>{it.title}</td>
                        <td>{it.createdDate}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
        {showDetails && (
          <NotificationDetails
            item={selectedItem}
            onGoBack={() => setShowDetails(false)}
            onMessageRead={removeItem}
          />
        )}
      </>
    </>
  );
}

export default UserNotification;
