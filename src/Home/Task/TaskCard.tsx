import { Card, Popconfirm, Tooltip } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbClockDown } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { TbClockCheck } from "react-icons/tb";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { Doc } from "./AllTypes";
type Props = {
  doc?:Doc
  type?: "todo" | "in-progress" | "completed";

};

const TaskCard = ({
  doc,
  type = "todo",
}: Props) => {
  let cardstyle=""
    if (type=="todo") {
        cardstyle="bg-orange-200"
    }else if(type=="in-progress"){
        cardstyle="bg-blue-200"
    }else{
        cardstyle="bg-cyan-200"
    }
    const confirm = (id:string|undefined) => {
      console.log(id);
    };

  return (
    <Card className={`font-roboto-slab mt-4 ${cardstyle}`}>
      <div className="flex items-center">
        <div className="flex-1">
          <div className=" flex gap-3">
            {type == "in-progress" ? (
              <p className="bg-cyan-200 text-cyan-600 rounded-md inline-block p-1 text-xs t">
                Started at {dayjs().format("DD-MM-YY hh:mm:ss A")}{" "}
              </p>
            ) : type == "completed" ? (
              <p className="bg-green-200 text-green-600 rounded-md inline-block p-1 text-xs t">
                Completed at {dayjs().format("DD-MM-YY hh:mm:ss A")}{" "}
              </p>
            ) : null}
          </div>

          <p className="text-lg  font-bold">{doc?.title || ""}</p>
          <p className="font-semibold">{doc?.description|| ""}</p>
        </div>
        <Tooltip title="Edit">
          <div className=" px-4 hover:cursor-pointer">
            <FaPen className="text-2xl text-center text-yellow-500" />
          </div>
        </Tooltip>
        {type == "todo" ? (
          <Tooltip title="Move to in progress">
            {" "}
            <div className="border-l px-4 hover:cursor-pointer">
              <TbClockDown className="text-3xl text-center text-blue-500" />
            </div>
          </Tooltip>
        ) : type == "in-progress" ? (
          <Tooltip title="Move to complete">
            <div className="border-l px-4">
              <TbClockCheck className="text-3xl text-center text-blue-500 hover:cursor-pointer" />
            </div>
          </Tooltip>
        ) : null}
        <Tooltip title="Delete">
          <Popconfirm
          title="Delete"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          onConfirm={()=>{confirm(doc?._id)}}
          okButtonProps={{ loading: false }}
          icon={<MdDelete className="text-red-500 text-lg"/>}
          >
          <div className="border-l px-4 hover:cursor-pointer">
            <MdOutlineDeleteOutline className="text-3xl text-center text-red-500" />
          </div>
          </Popconfirm>
        </Tooltip>
      </div>
    </Card>
  );
};

export default TaskCard;
