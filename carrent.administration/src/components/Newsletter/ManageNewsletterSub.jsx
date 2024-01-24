import { Button, Card } from "react-bootstrap";

function ManageNewsletterSub({ item, hide }) {
  return (
    <Card>
      <Button onClick={hide}>Hide</Button>
    </Card>
  );
}

export default ManageNewsletterSub;
