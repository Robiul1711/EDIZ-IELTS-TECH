import React, { useState, useEffect } from "react";
import { Modal, ConfigProvider, theme, Select } from "antd";
import { X, Target } from "lucide-react";

const TargetScoreModal = ({ isOpen, onClose, currentScores, onSave }) => {
  const isDark = document.documentElement.classList.contains("dark");
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (currentScores) {
      setScores(JSON.parse(JSON.stringify(currentScores)));
    }
  }, [currentScores, isOpen]);

  const handleScoreChange = (label, newValue) => {
    setScores((prev) =>
      prev.map((s) => (s.label === label ? { ...s, value: newValue } : s)),
    );
  };

  const scoreOptions = Array.from({ length: 19 }, (_, i) => {
    const val = (i * 0.5).toFixed(1);
    return { value: `${val}/9`, label: val };
  });

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
        width={450}
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
        <div className="p-8 bg-white dark:bg-slate-900">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-[#635BFF] mb-4">
              <Target size={30} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              Set Target Scores
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Aim high and track your progress
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {scores.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {item.label}
                </label>
                <Select
                  className="w-full h-12"
                  value={item.value}
                  onChange={(val) => handleScoreChange(item.label, val)}
                  options={scoreOptions}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(scores);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#635BFF] text-white font-bold hover:bg-[#5046e5] shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default TargetScoreModal;
