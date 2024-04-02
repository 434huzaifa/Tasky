/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Divider, Form, Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./wavy.css";
import { UserCredential, updateProfile } from "firebase/auth";
import showToast from "../Utility/showToast";
import useAuth from "../Hook/useAuth";
import useAxios from "../Hook/useAxios";
const Register = () => {
  const { createUser, changeLoading, loading } = useAuth();
  const caxios = useAxios();
  const navigate = useNavigate();
  function onFinish(values: any) {
    if (values.pass1 == values.pass2) {
      caxios
        .post("/user", { email: values.email, name: values.name })
        .then(() => {
          createUser(values.email, values.pass1)
            .then((res: UserCredential) => {
              updateProfile(res.user, {
                displayName: values.name,
              })
                .then(() => {
                  changeLoading(false);
                  showToast("success", "Account Created Successfully");
                  navigate("/login");
                })
                .catch((err: any) => {
                  changeLoading(false);
                  showToast("error", err.message);
                  console.log(err);
                });
            })
            .catch((err: any) => {
              changeLoading(false);
              showToast("error", err.message);
              console.log(err);
            });
        })
        .catch((err) => {
          changeLoading(false);
          showToast("error", err.message);
          console.log(err);
        });
    } else {
      showToast("error", "Password Mismatch");
    }
  }

  return (
    <div className=" justify-center flex items-center min-h-screen bg-wavy2">
      <Spin spinning={loading}>
        <Card className="w-96 pb-12 pt-6 backdrop-blur-md bg-opacity-0 bg-white">
          <div>
            <p className="mb-5 text-center text-3xl font-roboto-slab text-black">
              <span className="text-purple-800">Welcome,</span> To Tasky
            </p>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Name"
                className="font-bold"
                rules={[{ required: true }]}
                validateTrigger="onBlur"
              >
                <Input className="font-semibold font-roboto-slab"></Input>
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                className="font-bold"
                rules={[
                  { required: true },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input className="font-semibold font-roboto-slab"></Input>
              </Form.Item>
              <Form.Item
                name="pass1"
                label="Password"
                className="font-bold"
                rules={[
                  { required: true },
                  {
                    min: 6,
                    message: "Password Less then Six.",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "At least one uppercase,one lowercase and one number.",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input.Password className="font-semibold font-roboto-slab"></Input.Password>
              </Form.Item>
              <Form.Item
                name="pass2"
                label="Confirm Password"
                className="font-bold"
                rules={[{ required: true }]}
                validateTrigger="onBlur"
              >
                <Input.Password className="font-semibold font-roboto-slab"></Input.Password>
              </Form.Item>
              <div className="flex justify-center items-center flex-col">
                <Button
                  size="large"
                  htmlType="submit"
                  className="bg-orange-300 text-black font-semibold font-roboto-slab w-1/2"
                >
                  Register
                </Button>
                <Divider>OR</Divider>
                <p className="text-lg font-semibold font-roboto-slab">
                  If you have an account.{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default Register;
