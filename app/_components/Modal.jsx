import { Button } from "@/components/ui/button";

const Modal = ({ isOpen, children, className}) => {
    if (!isOpen) return null;

    return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 `}>
        <div className={`bg-slate-100 rounded-xl p-6 w-[700px] sm:w-[500px] xs:w-[500px] ${className}`}>
            {children}
        </div>
    </div>
    );
}

export default Modal;