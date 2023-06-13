import { useEffect } from "react";
import ReactPortal from "./reactportal";

interface BasicModalProps {
    children: React.ReactNode, 
    isOpen: boolean,
    handleClose: () => void
}

export default function BasicModal ({children, isOpen, handleClose}: BasicModalProps) {
    
    //Cerrar modal con tecla escape
    useEffect( () => {
        const closeOnEscapeKey = (e:KeyboardEvent) => e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {document.body.removeEventListener('keydown', closeOnEscapeKey);};
    }, [handleClose]);

    //Modal impide escrolear en el fondo
    useEffect( () => {
        document.body.style.overflow = 'hidden';
        return ():void => {document.body.style.overflow = 'unset';}
    }, [isOpen]);

    //Si no está abierto, devuelve null
    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <>
                <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" style={{zIndex:2}}/>{/*tapa el fondo*/}
                <div className="fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-green-500 inset-y-32 inset-x-96" style={{zIndex:3}}>
                    <button
                        onClick={handleClose}
                        className="self-end font-bold"
                        style={{rotate:'45deg', fontSize:'25px'}}
                    >+</button>
                    <div className="modal-content">
                        {/* No tiene contenido en sí, sino que se lo pasa quien lo llame en children */}
                        {children}
                    </div>
                </div>
            </>
        </ReactPortal>
    );
}