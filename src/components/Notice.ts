import { notification } from "antd";

/**
 * 定制化配置
 */
notification.config({
  duration: 2
});

type NoticeType = "success" | "error" | "info" | "warning";

export interface Notice {
  (type: NoticeType, title: string, content?: string): void;
}

export const notice: Notice = (
  type: NoticeType,
  title: string,
  content?: string
) => {
  notification[type]({
    message: title,
    description: content
  });
};
