import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker({ onChange, excludedDate, onBlur }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [excludedDateIntervals, setExcludedDateIntervals] = useState({});

  useEffect(() => {
    if (excludedDate != null) {
      const newExcludedDate = excludedDate.map((x) => ({
        start: new Date(x.rentalStart),
        end: new Date(x.rentalEnd),
      }));

      setExcludedDateIntervals(newExcludedDate);
    }
  }, [excludedDate]);

  const onStartDate = (date) => {
    setStartDate(date);
    onChange("DateFrom", formatDate(date));
  };

  const onEndDate = (date) => {
    setEndDate(date);
    onChange("DateTo", formatDate(date));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Form.Group as={Col}>
        <Form.Label>Od</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onStartDate(date)}
          selectsStart
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          excludeDateIntervals={excludedDateIntervals}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Do</Form.Label>
        <DatePicker
          selected={endDate}
          onChange={(date) => onEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          excludeDateIntervals={excludedDateIntervals}
        />
      </Form.Group>
    </>
  );
}

export default MyDatePicker;
