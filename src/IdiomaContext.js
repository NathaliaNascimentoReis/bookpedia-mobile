import { useState, createContext, useContext } from 'react';

const IdiomaContext = createContext();

export const IdiomaProvider = ({ children }) => {
    const [idioma, setIdioma] = useState('pt');
    const alternarIdioma = () => setIdioma((lang) => (lang === 'pt' ? 'en' : 'pt'));

    return (
        <IdiomaContext.Provider value={{ idioma, alternarIdioma }}>
            {children}
        </IdiomaContext.Provider>
    );
};

export const useIdioma = () => useContext(IdiomaContext);
