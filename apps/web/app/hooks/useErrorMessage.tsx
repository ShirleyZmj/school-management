import { App } from "antd";

export const useErrorMessage = () => {
  const { notification } = App.useApp();

  const showError = (
    title: string,
    messages: string | string[] | undefined
  ) => {
    notification.error({
      message: title,
      description: Array.isArray(messages) ? (
        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : (
        messages || "An error occurred"
      ),
    });
  };

  return { showError };
};
