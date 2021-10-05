import {useTranslation} from "@benjaminnoufel/translation";

const App = (): JSX.Element => {
    const translate = useTranslation({
        helloWorld: {
            en: "Hello World !",
            fr: "Bonjour à tous !"
        },
        description: {
            en: "This is my first website :o",
            fr: "Ceci est mon premier site web :o"
        }
    });

    return (
        <div>
            <h1>
                {translate("website.title.helloWorld", {
                    defaultLanguage: "ru",
                    fallbackLng: "en"
                })}
            </h1>
            <p>
                {translate("website.description", {
                    defaultLanguage: "ru",
                    fallbackLng: "en"
                })}
            </p>
        </div>
    )
};

export default App;
