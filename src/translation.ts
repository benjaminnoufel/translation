import {useRef, useState} from "react";

interface ITranslate {
    [key: string]: ITranslate;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type A = any;

export type SetLanguage = (newLanguage: string) => void;

export type TranslationCallback<T = string> = (key: string, defaultLanguage: string, separator?: string, fallback?: string) => T;

const objectFind = (path: string, target: ITranslate): null | string | ITranslate => {
    for (const property in target) {
        const [firstProperty, ...restProperties] = path.split(".");

        if (firstProperty === property) {
            if (0 === restProperties.length) {
                return target[property];
            }

            return objectFind(restProperties.join("."), target[property]);
        }
    }

    return null;
};


export const useLanguage = (fallback?: string): [string, SetLanguage] => {
    const navigatorLanguage: string = navigator.language;
    const normalizedNavigatorLanguage: string = navigatorLanguage.slice(0, navigatorLanguage.indexOf("-"));
    const [lang, setLanguage] = useState(fallback || window.localStorage.getItem("lang") || normalizedNavigatorLanguage);
    window.localStorage.setItem("lang", lang);
    const setLang = (newLanguage: string): void => {
        window.localStorage.setItem("lang", newLanguage);
        setLanguage(newLanguage);
    };

    return [lang, setLang];
};


export const useTranslation = <T = string>(initialTranslations: Record<string, A>): TranslationCallback<T> => {
    const translations = useRef(initialTranslations).current;

    const translate = (translations: Record<string, A>) => <T = string>(key: string, defaultLanguage: string, separator: string = ".", fallback: string = `TODO.${key}.${defaultLanguage}`): string | T => {
        if (!key.includes(separator)) {
            if (translations[key]) {
                if (translations[key][defaultLanguage]) {
                    return translations[key][defaultLanguage] as string;
                }

                if ("development" === process.env.NODE_ENV) {
                    return fallback;
                }
                return "";
            }
            if ("development" === process.env.NODE_ENV) {
                return fallback;
            }
            return "";
        }
        const foundTranslation = objectFind(key, translations);
        if (foundTranslation) {
            const foundTranslationLanguages = Object.entries(foundTranslation);

            const foundDefaultLanguage = foundTranslationLanguages.find(([defaultTranslation]) => defaultTranslation === defaultLanguage);
            if (foundDefaultLanguage?.length) {
                return foundDefaultLanguage[1] as string;
            }
            if ("development" === process.env.NODE_ENV) {
                return fallback;
            }
            return "";
        }
        if ("development" === process.env.NODE_ENV) {
            return fallback;
        }
        return "";
    };
    return translate(translations) as TranslationCallback<T>;
};
