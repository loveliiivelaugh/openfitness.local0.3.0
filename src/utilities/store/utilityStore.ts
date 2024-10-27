import { create } from 'zustand';

interface AlertType {
    severity: "success" | "error" | "warning" | "info";
    message: string;
    open: boolean;
};

interface ConfirmType {
    open: boolean;
    title?: string;
    message?: string;
    severity?: "success" | "error" | "warning" | "info";
    continueText?: string;
    cancelText?: string;
    onConfirm?: (
        answer: boolean,
        resolve?: (value: boolean | PromiseLike<boolean>) => void) => void | Promise<void>;
    onCancel?: (answer: boolean) => void;
};

interface DrawerType {
    children?: any
    anchor?: "left" | "right" | "top" | "bottom"
    open?: boolean
    content?: any
    variant?: "permanent" | "persistent" | "temporary"
    onOpen?: (cb: () => void) => void
    onClose?: (cb: () => void) => void
}

interface UtilityStoreType {
    
    confirm: ConfirmType
    setConfirm: (confirm: UtilityStoreType["confirm"]) => void;
    clearConfirm: () => void;
    
    colorMode: "light" | "dark";
    setColorMode: (colorMode: UtilityStoreType["colorMode"]) => void;
    
    alert: AlertType
    setAlert: (alert: UtilityStoreType["alert"]) => void;
    createAlert: (severity: string, message: string) => void;

    drawer: DrawerType
    setDrawer: (drawer: UtilityStoreType["drawer"]) => void;
}

const useUtilityStore = create<UtilityStoreType>((set) => ({
    alert: {
        severity: "success",
        message: "",
        open: false
    },
    confirm: {
        open: false,
        title: "",
        message: "",
    },
    drawer: {
        open: false,
        content: null,
        anchor: "left"
    },
    colorMode: "dark",
    setDrawer: (drawer) => set((old) => ({ drawer: { ...old.drawer, ...drawer } })),
    setConfirm: (confirm) => set((old) => ({ confirm: { ...old.confirm, ...confirm }})),
    clearConfirm: () => set(() => ({ confirm: { open: false, title: "", message: "" } })),
    setColorMode: (colorMode) => set(() => ({ colorMode })),
    setAlert: (alert) => set(() => ({ alert })),
    createAlert: (severity: string, message: string) => set(() => ({ alert: { severity, message, open: true } }) as UtilityStoreType),
}));

export default useUtilityStore;
export { useUtilityStore }
export type { UtilityStoreType, AlertType, ConfirmType, DrawerType };
