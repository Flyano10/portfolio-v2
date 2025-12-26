'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiX } from 'react-icons/hi';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
}

export default function Toast({ isOpen, onClose, type, message }: ToastProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[9998]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-xs w-full"
            >
              {/* Icon + Message */}
              <div className="flex items-start gap-3 mb-5">
                {type === 'success' ? (
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <HiCheck className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <HiX className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line flex-1 pt-0.5">
                  {message}
                </p>
              </div>

              {/* OK Button */}
              <button
                onClick={onClose}
                className={`w-full py-2.5 px-4 rounded-md font-medium text-sm text-white ${
                  type === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                } transition-colors`}
              >
                OK
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

