import { useState, useLayoutEffect } from "react"
import { createPortal } from "react-dom"

interface ReactPortalProps {
    children: React.ReactElement,
    wrapperId: string
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
    if (!document) return null;
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export default function ReactPortal ({children, wrapperId}: ReactPortalProps) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        // Si no existe un wrapper con esa id, lo crea y lo agrega al cuerpo
        if(!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element!);

        return () => { // Elimina el elemento creado
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);
    
    //En el primer render, wrapperElement state retorna null.
    if (!wrapperElement) return null;
    return createPortal(children, wrapperElement);

}