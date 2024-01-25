import React from "react";
import { useSelector } from "react-redux";
import WorkOrderAdminView from "./WorkOrderAdminView";
import WorkOrderWorkerView from "./WorkOrderWorkerView";
import { ToastContainer } from "react-toastify";

function WorkOrders() {
  const user = useSelector((state) => state.user);
  const isAdmin = user.role.includes("Administrator");
  const isWorker = user.role.includes("Worker");

  return (
    <>
      <ToastContainer />
      {isAdmin && <WorkOrderAdminView />}
      {isWorker && <WorkOrderWorkerView />}
    </>
  );
}

export default WorkOrders;
