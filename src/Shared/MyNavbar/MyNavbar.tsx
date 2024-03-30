import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const MyNavbar = () => {
  return (
    <div className="flex justify-between border-b pb-2 pr-10">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" alt="" className="size-10" />
        <p className="font-bold text-xl font-roboto-slab">Tasky</p>
      </div>
      <Avatar size={50} icon={<UserOutlined />} />
    </div>
  );
};

export default MyNavbar;
