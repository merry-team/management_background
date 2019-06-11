import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Form, Input, Icon, Button } from "antd";
import "./Login.scss";
import { FormComponentProps } from "antd/lib/form";
import UserStore from "../../stores/UserStore";

const FormItem = Form.Item;

interface LoginProps extends FormComponentProps {
  userStore?: UserStore;
}

interface LoginState {
  loading: boolean;
}

type FieldValues = {
  account: string | undefined;
  password: string | undefined;
};

@inject("userStore")
@observer
class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleLogin = () => {
    this.props.form.validateFields(async (err, values: FieldValues) => {
      if (!err) {
        this.setState({
          loading: true
        });
        try {
          await this.props.userStore!.login(values.account!, values.password!);
        } catch (error) {
        } finally {
          this.setState({
            loading: false
          });
        }
      }
    });
  };

  render() {
    const { loading } = this.state;
    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <Form className="login-form">
          <FormItem>
            {getFieldDecorator("account", {
              rules: [{ required: true, message: "请输入用户名" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0, 0, 0, .25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0, 0, 0, .25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              className="login-button"
              type="primary"
              loading={loading}
              onClick={this.handleLogin}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
