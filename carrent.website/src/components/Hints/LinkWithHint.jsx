import { OverlayTrigger, Tooltip } from "react-bootstrap";

function LinkWithHint({ id, children, title }) {
  return (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );
}

export default LinkWithHint;
