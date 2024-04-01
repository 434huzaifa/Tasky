import { Card, Pagination } from "antd";
import TaskCard from "./TaskCard";

const CompleteDiv = () => {
  function onChange(value: number) {
    console.log(value);
  }
  return (
    <Card className="bg-cyan-100">
      <div>
        <p className="text-xl underline underline-offset-8 font-roboto-slab font-bold text-center">
          Complete
        </p>
        <div>
          <TaskCard type="completed"></TaskCard>
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

export default CompleteDiv;
