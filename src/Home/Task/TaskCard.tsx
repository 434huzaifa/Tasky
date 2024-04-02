import { Card, Popconfirm, Spin, Tooltip } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { TbClockPlus, TbClockBolt } from "react-icons/tb";
import { TbClockCheck } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Doc, UpdateDoc } from "./AllTypes";
import showToast from "../../Utility/showToast";
import { useTaskDelete, useTaskFullUpdate, useTaskUpdate } from "./AllMutation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  doc?: Doc;
  type?: "todo" | "in-progress" | "completed";
  taskUpdater: (task: UpdateDoc, id: string|undefined) => void;
};

const TaskCard = ({ doc, type = "todo", taskUpdater }: Props) => {
  const mutationTaskUpdate = useTaskUpdate();
  const mutateUpdater = useTaskFullUpdate();
  const mutationDelete = useTaskDelete(type);
  function handelEdit() {
    taskUpdater(
      {
        completeDate: doc?.completeDate,
        description: doc?.description,
        title: doc?.title,
        startDate: doc?.startDate,
        status: doc?.status,
      },
      doc?._id
    );
  }
  let cardstyle = "";
  if (type == "todo") {
    cardstyle = "bg-orange-200";
  } else if (type == "in-progress") {
    cardstyle = "bg-blue-200";
  } else {
    cardstyle = "bg-cyan-200";
  }
  const confirm = async (id: string | undefined) => {
    await mutationDelete.mutateAsync(id);
  };
  async function handelInProgress(id: string | undefined) {
    if (id) {
      await mutationTaskUpdate.mutateAsync({ id: id, who: "in-progress" });
    } else {
      showToast("error", "Id not found");
    }
  }
  async function handelCompleted(id: string | undefined) {
    if (id) {
      await mutationTaskUpdate.mutateAsync({ id: id, who: "completed" });
    } else {
      showToast("error", "Id not found");
    }
  }
  return (
    <>
      <Card className={`font-roboto-slab mt-4 ${cardstyle}`} hoverable>
        <div className="flex items-center md:flex-row flex-col">
          <div className="flex-none w-full md:flex-1">
            <div className=" flex gap-3">
              {type == "in-progress" ? (
                <div className="flex gap-3 font-semibold">
                  <p className="bg-cyan-200 text-cyan-600 rounded-md gap-1 px-1 text-xs flex items-center text-center">
                    <TbClockPlus className="text-lg text-pink-500" />{" "}
                    <span >{dayjs(doc?.createdAt)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}</span>
                    
                  </p>
                  <p className="bg-cyan-200 text-cyan-600 rounded-md gap-1 px-1 text-xs flex items-center text-center">
                    <TbClockBolt className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.startDate)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}
                  </p>
                </div>
              ) : type == "completed" ? (
                <div className="flex gap-3 font-semibold">
                  <p className="bg-green-200 text-green-600 rounded-md gap-1 px-1 text-xs flex items-center text-center">
                    <TbClockPlus className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.createdAt)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}
                  </p>
                  <p className="bg-green-200 text-green-600 rounded-md gap-1 px-1 text-xs flex items-center text-center">
                    <TbClockBolt className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.startDate)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}
                  </p>
                  <p className="bg-green-200 text-green-600 rounded-md gap-1 px-1 text-xs flex items-center text-center">
                    <TbClockCheck className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.completeDate)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}
                  </p>
                </div>
              ) : type == "todo" ? (
                <div className="font-semibold">
                  <p className="bg-sky-200 text-sky-600 rounded-md gap-1 px-1 text-xs flex items-center text-center">
                    <TbClockPlus className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.createdAt)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}
                  </p>
                </div>
              ) : null}
            </div>

            <p className="text-lg  font-bold ">{doc?.title || ""}</p>
            <p className="text-xs italic font-light text-black">
              {doc?.description || ""}
            </p>
          </div>
          <div className="flex justify-center items-center">
          <Tooltip title="Edit">
            <Spin spinning={mutateUpdater.isPending}>
            <div className="hover:cursor-pointer border-r pr-3" onClick={handelEdit}>
              <FaPen className="text-2xl text-center text-yellow-500" />
            </div></Spin>
          </Tooltip>
          {type == "todo" ? (
            <Tooltip title="Move to in progress">
              {" "}
              <Spin spinning={mutationTaskUpdate.isPending}>
              <div
                className="px-3 hover:cursor-pointer"
                onClick={() => {
                  handelInProgress(doc?._id);
                }}
              >
                <TbClockBolt className="text-3xl text-center text-blue-500" />
              </div></Spin>
            </Tooltip>
          ) : type == "in-progress" ? (
            <Tooltip title="Move to complete">
              <Spin spinning={mutationTaskUpdate.isPending}>
              <div
                className="hover:cursor-pointer  px-3 "
                onClick={() => {
                  handelCompleted(doc?._id);
                }}
              >
                <TbClockCheck className="text-3xl text-center text-blue-500 hover:cursor-pointer" />
              </div>
              </Spin>
            </Tooltip>
          ) : null}
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                confirm(doc?._id);
              }}
              okButtonProps={{ loading: mutationDelete.isPending }}
              icon={<MdDelete className="text-red-500 text-lg" />}
            >
              <Spin spinning={mutationDelete.isPending}>
                <div className="hover:cursor-pointer border-l pl-2">
                  <MdOutlineDeleteOutline className="text-3xl text-center text-red-500" />
                </div>
              </Spin>
            </Popconfirm>
          </Tooltip>
          </div>

        </div>
      </Card>
    </>
  );
};

export default TaskCard;
