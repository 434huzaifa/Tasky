import { Card, Pagination } from "antd";
import TaskCard from "./TaskCard";

type Props = {
  cardTitle?: string;
  type?: "todo" | "in-progress" | "completed";
};

const TaskDiv = ({ cardTitle = "Todo",type="todo" }: Props) => {
    function onChange(value:number) {
        console.log(value);
    }
    let cardstyle=""
    if (type=="todo") {
        cardstyle="bg-orange-100"
    }else if(type=="in-progress"){
        cardstyle="bg-blue-100"
    }else{
        cardstyle="bg-cyan-100"
    }
  return (
    <Card className={cardstyle}>
      <div>
        <p className="text-xl underline underline-offset-8 font-roboto-slab font-bold text-center">
          {cardTitle}
        </p>
        <div>
            <TaskCard type={type}></TaskCard>
        </div>
      </div>
      <div className="flex justify-end mt-2">
      <Pagination onChange={onChange} size="small"  total={50} pageSize={5}></Pagination>

      </div>
    </Card>
  );
};

export default TaskDiv;
