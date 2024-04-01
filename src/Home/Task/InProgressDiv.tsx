import { Card, Pagination } from "antd";
import TaskCard from "./TaskCard";
const InProgressDiv = () => {
  function onChange(value: number) {
    console.log(value);
  }
  return (
    <Card className="bg-blue-100">
      <div>
        <p className="text-xl underline underline-offset-8 font-roboto-slab font-bold text-center">
          In Progress
        </p>
        <div>
          <TaskCard type="in-progress"></TaskCard>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Pagination
          onChange={onChange}
          size="small"
          total={50}
          pageSize={5}
        ></Pagination>
      </div>
    </Card>
  );
};

export default InProgressDiv;
