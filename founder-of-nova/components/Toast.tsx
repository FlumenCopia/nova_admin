'use client';

import { ToastData } from '@/types';

interface ToastProps {
  toast: ToastData;
}

export default function Toast({ toast }: ToastProps) {
  return (
    <div
      className={`toast ${toast.show ? 'show' : ''}`}
      id="toast"
      style={{ display: toast.show ? 'flex' : 'none' }}
    >
      <div className="toast-icon">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <div className="toast-body">
        <strong id="toast-title">{toast.title}</strong>
        <p id="toast-desc">{toast.desc}</p>
      </div>
    </div>
  );
}

