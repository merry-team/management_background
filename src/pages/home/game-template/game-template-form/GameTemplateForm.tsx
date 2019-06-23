import React, { Component } from "react";
import { FormComponentProps } from "antd/lib/form";
import {
  Form,
  InputNumber,
  Button,
  Divider,
  Input,
  DatePicker,
  Select
} from "antd";
import "./GameTemplateForm.scss";
import { Moment } from "moment";

const TextArea = Input.TextArea;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

enum GameTemplateField {
  CATEGORY = "category",
  GAME_RULE = "game_rule",
  DURATION = "duration",
  CHALLENGE_COUNT = "challenge_count",
  CHALLENGE_SCORE = "challenge_score",
  // 赛季起止时间
  QUARTER_STARTED_ENDED_AT = "quarter_started_ended_at"
}

export type GameTemplateFieldValues = {
  game_rule: string | null;
  duration: number | null;
  category: "challenge" | "arena" | "quarter" | null;
  challenge_count: number | null;
  challenge_score: number | null;
  quarter_started_ended_at: Moment[] | null;
};

type GameTemplateFieldErrors = {
  [key in GameTemplateField]: {
    errors: {
      message: string;
      field: GameTemplateField;
    }[];
  };
};

interface GameTemplateFormProps extends FormComponentProps {
  onSave: (values: GameTemplateFieldValues) => void;
  onCancel: () => void;
  initialValues?: GameTemplateFieldValues;
}

class _GameTemplateForm extends Component<GameTemplateFormProps> {
  handleSubmit = () => {
    const { form, onSave } = this.props;
    form.validateFieldsAndScroll(
      (errors: GameTemplateFieldErrors, values: GameTemplateFieldValues) => {
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

  get selectedCategory() {
    const form = this.props.form;
    const value = form.getFieldValue("category");
    return value;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="game-template-form">
        <FormItem {...formItemLayout} label="游戏分类">
          {getFieldDecorator("category", {
            rules: [{ required: true, message: "请选择游戏分类" }]
          })(
            <Select placeholder="Please select game category">
              <Option value="challenge">挑战赛</Option>
              <Option value="arena">擂台赛</Option>
              <Option value="quarter">排位赛</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="游戏规则">
          {getFieldDecorator("game_rule", {
            rules: [{ required: true, message: "请填写游戏规则" }]
          })(<TextArea />)}
        </FormItem>
        <FormItem {...formItemLayout} label="游戏时间">
          {getFieldDecorator("duration", {
            rules: [{ required: true, message: "请填写游戏时间" }]
          })(<InputNumber style={{ width: "100%" }} min={1} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="挑战次数">
          {getFieldDecorator("challenge_count", {
            rules: [{ required: true, message: "请填写挑战次数" }]
          })(<InputNumber style={{ width: "100%" }} min={1} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="挑战分数">
          {getFieldDecorator("challenge_score", {
            rules: [{ required: true, message: "请填写挑战分数" }]
          })(<InputNumber style={{ width: "100%" }} min={1} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="赛季起止时间">
          {getFieldDecorator("quarter_started_ended_at", {
            rules: [
              {
                required: this.selectedCategory === "quarter" ? true : false,
                message: "请选择赛季起止时间"
              }
            ]
          })(
            <RangePicker
              style={{ width: "100%" }}
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={["quarter_started_at", "quarter_ended_at"]}
            />
          )}
        </FormItem>
        <Divider />
        <FormItem>
          <div className="game-template-form-buttons">
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

const GameTemplateForm = Form.create<GameTemplateFormProps>({
  mapPropsToFields(props: GameTemplateFormProps) {
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
})(_GameTemplateForm);

export default GameTemplateForm;
