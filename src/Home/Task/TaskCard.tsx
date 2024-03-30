import { Card } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbClockDown } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
type Props={
    title?:string
    description?:string
    type?:"todo"|"in-progress"|"completed"
}

const TaskCard = ({title="Title here",description="This is description...",type="todo"}:Props) => {
  return (
    <Card className="font-roboto-slab">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-lg  font-bold">{title}</p>
          <p className="font-semibold">{description}</p>
        </div>
        <div className=" px-4 hover:cursor-pointer">
          <FaPen className="text-2xl text-center text-yellow-500" />
        </div>
        {
            type=="todo"? <div className="border-l px-4 hover:cursor-pointer">
            <TbClockDown className="text-3xl text-center text-blue-500" />
          </div>: type=="in-progress"? <div className="border-l px-4">
          <GrInProgress className="text-2xl text-center text-blue-500" />
        </div>:null
        }
        
        <div className="border-l px-4 hover:cursor-pointer">
          <MdOutlineDeleteOutline className="text-3xl text-center text-red-500" />
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
