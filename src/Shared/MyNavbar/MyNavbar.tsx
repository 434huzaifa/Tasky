import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const MyNavbar = () => {
  return (
    <div className="flex justify-end border-b pb-2 pr-10">
      <Avatar size={50} icon={<UserOutlined />} />
    </div>
  );
};

export default MyNavbar;
