import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const MyNavbar = () => {
  return (
    <div className="flex justify-end">
      <Avatar size={64} icon={<UserOutlined />} />
    </div>
  );
};

export default MyNavbar;
