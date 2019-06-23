import React, { Component } from "react";
import { FormComponentProps } from "antd/lib/form";
import { Form, InputNumber, Button, Divider } from "antd";
import "./TaskForm.scss";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
};

enum TaskField {
  CHALLENGE_SCORE = "challenge_score",
  REWARD_SCORE = "reward_score"
}

export type TaskFieldValues = { [key in TaskField]: number | undefined };

type TaskFieldErrors = {
  [key in TaskField]: {
    errors: {
      message: string;
      field: TaskField;
    }[];
  };
};

interface TaskFormProps extends FormComponentProps {
  onSave: (values: TaskFieldValues) => void;
  onCancel: () => void;
  initialValues?: TaskFieldValues;
}

class _TaskForm extends Component<TaskFormProps> {
  handleSubmit = () => {
    const { form, onSave } = this.props;
    form.validateFieldsAndScroll(
      (errors: TaskFieldErrors, values: TaskFieldValues) => {
        if (!errors) {
          onSave && onSave(values);
        }
      }
    );
  };

  handleCancel = () => {
    const { form, onCancel } = this.props;
    form.resetFields();
    onCancel && onCancel();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="task-form">
        <FormItem {...formItemLayout} label="挑战分数">
          {getFieldDecorator("challenge_score", {
            rules: [{ required: true, message: "请填写挑战分数" }]
          })(<InputNumber style={{ width: "100%" }} min={1} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="奖励分数">
          {getFieldDecorator("reward_score", {
            rules: [{ required: true, message: "请填写奖励分数" }]
          })(<InputNumber style={{ width: "100%" }} min={1} />)}
        </FormItem>
        <Divider />
        <FormItem>
          <div className="task-form-buttons">
            <Button className="cancel-btn" onClick={this.handleCancel}>
              取消
            </Button>
            <Button
              className="submit-btn"
              type="primary"
              onClick={this.handleSubmit}
            >
              确定
            </Button>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const TaskForm = Form.create<TaskFormProps>({
  mapPropsToFields(props: TaskFormProps) {
    const values: any = {};
    const initialValues: any = props.initialValues;

    if (!!initialValues) {
      Object.keys(initialValues).forEach(k => {
        values[k] = Form.createFormField({
          value: initialValues[k]
        });
      });
    }
    return values;
  }
})(_TaskForm);

export default TaskForm;
