import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useRef, useState } from 'react'

// ─── Types ──────────────────────────────────────────────────────────

type ToastType = 'success' | 'error'

interface Toast {
    id: number
    message: string
    type: ToastType
}

interface ToastContextValue {
    success: (message: string) => void
    error: (message: string) => void
}

// ─── Context ────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Hook to show toast notifications. Must be used within `<ToastProvider>`.
 * Replaces `react-hot-toast` with zero dependencies.
 *
 * @example
 * const toast = useToast();
 * toast.success("Copied to clipboard");
 * toast.error("Something went wrong");
 */
export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext)
    if (!ctx) {
        throw new Error('useToast must be used within a <ToastProvider>')
    }
    return ctx
}

// ─── Provider ───────────────────────────────────────────────────────

const TOAST_DURATION = 3000

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])
    const idRef = useRef(0)

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = ++idRef.current
        setToasts((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, TOAST_DURATION)
    }, [])

    const success = useCallback((message: string) => addToast(message, 'success'), [addToast])
    const error = useCallback((message: string) => addToast(message, 'error'), [addToast])

    return (
        <ToastContext.Provider value={{ success, error }}>
            {children}

            {/* Toast container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium
              animate-[slideIn_0.3s_ease-out]
              ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}
            `}
                    >
                        <span>{toast.type === 'success' ? '✓' : '✕'}</span>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
