/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Popover } from "antd";
import useAuth from "../../Hook/useAuth";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const MyNavbar = () => {
  const { user, logOut, logoutJWT,changeLoading,loading } = useAuth();
  const navigate=useNavigate()
  function handelLogout() {
    logOut()
    .then(() => {
      logoutJWT()
      .then(() => {
        changeLoading(false)
        navigate("/login")
      })
      .catch((err: any) => {
        changeLoading(false)
        navigate("/login")
        console.log("logoutJWT~", err);
      });
    })
    .catch((err: any) => {
      changeLoading(false)
      console.log("logout~", err);
    });
    console.log("~ loading", loading)
  }

  const popoverContent = (
    <div className="font-roboto-slab">
      <p className="text-lg font-bold">{user?.displayName}</p>
      <p>{user?.email}</p>
      <Button
        size="small"
        onClick={handelLogout}
        className="w-full bg-red-200 text-red-800 font-semibold"
      >
        {" "}
        Logout
      </Button>
    </div>
  );
  return (
    <div className="flex justify-between border-b pb-2 pr-10">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" alt="" className="size-10" />
        <p className="font-bold text-xl font-roboto-slab">Tasky</p>
      </div>
      <Popover content={popoverContent} trigger="click">
        <Avatar size={50} src={user?.photoURL} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default MyNavbar;
