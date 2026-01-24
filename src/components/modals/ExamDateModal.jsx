import React from "react";
import { Modal, Calendar, ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import { X } from "lucide-react";

const ExamDateModal = ({ isOpen, onClose, selectedDate, onSelect }) => {
  const { token } = theme.useToken();
  const isDark = document.documentElement.classList.contains("dark");

  const customTheme = {
    token: {
      colorPrimary: "#635BFF",
      borderRadius: 16,
    },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        closeIcon={<X size={20} className="text-slate-400" />}
        centered
        width={400}
        styles={{
          mask: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          content: {
            padding: 0,
            borderRadius: 24,
            overflow: "hidden",
          },
        }}
      >
        <div className="p-6 bg-white dark:bg-slate-900">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            Set Exam Date
          </h3>
          <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden p-2">
            <Calendar
              fullscreen={false}
              value={selectedDate ? dayjs(selectedDate) : dayjs()}
              onChange={(date) => {
                onSelect(date.toDate());
                onClose();
              }}
            />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-sm text-center text-slate-500">
              Selected:{" "}
              <span className="font-bold text-[#635BFF]">
                {selectedDate
                  ? dayjs(selectedDate).format("MMM DD, YYYY")
                  : "None"}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ExamDateModal;
