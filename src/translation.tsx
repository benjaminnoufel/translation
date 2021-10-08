import {ReactNode, createContext, useContext, useRef, useState} from "react";

interface TranslateProviderProps {
    userConfig?: IConfig;
    children: ReactNode;
}

interface ITranslate {
    [key: string]: ITranslate;
}

interface IConfigMessages {
    [key: string]: Record<string, any>;
}

interface IConfig {
    locale: string;
    fallbackLng: string;
    separator?: string;
    fallbackMsg?: string;
    messages: IConfigMessages;
}

const rootConfig: IConfig = {
    locale: "en",
    fallbackLng: "en",
    separator: ".",
    messages: {}
};

interface ITranslateFunc {
    defaultLanguage: string;
    fallbackLng?: string;
    separator?: string;
    fallback?: string;
}


export type SetLanguage = (newLanguage: string) => void;

/**
 * Create Context for use user config.
 * @type {React.Context<IConfig>}
 */
const TranslationContext = createContext<IConfig>(rootConfig);

export type TranslationCallback<T = string> = (key: string, {defaultLanguage, fallbackLng, separator, fallback}: ITranslateFunc) => T;

interface IObjectFind {
    path: string;
    target: ITranslate;
    separator: string;
}

/**
 * Search recursively in objet if key exist by split it with "separator`
 * @param {string} path
 * @param {ITranslate} target
 * @param {string} separator
 * @returns {string | ITranslate | null}
 */
const objectFind = ({path, target, separator}: IObjectFind): null | string | ITranslate => {
    for (const property in target) {
        const [firstProperty, ...restProperties] = path.split(separator);

        if (firstProperty === property) {
            if (0 === restProperties.length) {
                return target[property];
            }

            return objectFind({
                path: restProperties.join(separator),
                target: target[property],
                separator
            });
        }
    }

    return null;
};

/**
 * React Hook
 * Get user language or use fallback and set it in localStorage
 * Return also a setter for set a new language
 * @param {string} fallback
 * @returns {[string, SetLanguage]}
 */
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

/**
 * React Hooks
 * Get an object in params who contains a translation object.
 * See example for usage (https://github.com/benjaminnoufel/translation/tree/next/examples/use-hooks)
 * @param {Record<string, any>} initialTranslations
 * @returns {TranslationCallback<T>}
 */
export const useTranslation = <T, >(initialTranslations: Record<string, any>): TranslationCallback<T> => {
    const translations = useRef(initialTranslations).current;

    const translate = (translations: Record<string, any>) => <T, >(key: string, {defaultLanguage, fallbackLng, separator, fallback}: ITranslateFunc): string | T => {
        if ("undefined" === typeof separator) {
            separator = ".";
        }
        if ("undefined" === typeof fallback) {
            fallback = `TODO${separator}${key}${separator}${defaultLanguage}`;
        }
        if (!key.includes(separator)) {
            if (translations[key]) {
                if (translations[key][defaultLanguage]) {
                    return translations[key][defaultLanguage] as string;
                }
                if (fallbackLng && translations[key][fallbackLng]) {
                    return translations[key][fallbackLng] as string;
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
        const foundTranslation = objectFind({
            path: key,
            target: translations,
            separator
        });
        if (foundTranslation) {
            const foundTranslationLanguages = Object.entries(foundTranslation);

            const foundDefaultLanguage = foundTranslationLanguages.find(([defaultTranslation]) => defaultTranslation === defaultLanguage);
            if ("undefined" !== typeof foundDefaultLanguage && foundDefaultLanguage.length) {
                return foundDefaultLanguage[1] as string;
            }
            if ("undefined" !== typeof fallbackLng && "string" !== typeof foundTranslation && foundTranslation[fallbackLng]) {
                return foundTranslation[fallbackLng] as unknown as string;
            }
            if ("development" === process.env.NODE_ENV) {
                return fallback;
            }
            return "";
        }
        if (fallbackLng && translations[key] && translations[key][fallbackLng]) {
            return translations[key][fallbackLng] as string;
        }
        if ("development" === process.env.NODE_ENV) {
            return fallback;
        }
        return "";
    };
    return translate(translations) as TranslationCallback<T>;
};

/**
 * React Context
 * Wrap context on component app wich is taking a configuration in a props
 * See example for usage (https://github.com/benjaminnoufel/translation/tree/next/examples/use-provider)
 * For configuration you can see all params in README.md (https://github.com/benjaminnoufel/translation)
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined} children
 * @param {IConfig | undefined} userConfig
 * @returns {JSX.Element}
 * @constructor
 */
export const TranslateProvider = ({children, userConfig}: TranslateProviderProps): JSX.Element => {
    const useConfig: IConfig = {
        ...rootConfig,
        ...userConfig
    };
    return (
        <TranslationContext.Provider value={useConfig}>
            {children}
        </TranslationContext.Provider>
    );
};

/**
 * React Component
 * Call it as a Component with a key that we want to translate
 * See example for usage (https://github.com/benjaminnoufel/translation/tree/next/examples/use-provider)
 * @param {string} word
 * @returns {JSX.Element}
 * @constructor
 */
export const TranslateMessage = ({word}: {word: string}) => {
    const ctx = useContext(TranslationContext);
    const translate = useTranslation(ctx.messages);
    return (
        <>
            {translate(word, {
                defaultLanguage: ctx.locale,
                fallbackLng: ctx.fallbackLng,
                separator: ctx.separator,
                fallback: ctx.fallbackMsg
            })}
        </>
    );
};
