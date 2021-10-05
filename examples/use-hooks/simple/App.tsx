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
                {translate("helloWorld", {
                    defaultLanguage: "en"
                })}
            </h1>
            <p>
                {translate("description", {
                    defaultLanguage: "en"
                })}
            </p>
        </div>
    )
};

export default App;
