import { Button, Card } from "react-bootstrap";

function ManageNewsletterHistory({ item, hide }) {
  return (
    <Card>
      <Button onClick={hide}>Hide</Button>
    </Card>
  );
}

export default ManageNewsletterHistory;
