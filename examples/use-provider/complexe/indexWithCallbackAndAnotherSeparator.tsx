import {TranslateProvider, TranslateMessage} from "@benjaminnoufel/translation";
import React, {StrictMode} from "react";
import ReactDOM from "react-dom";


const App = () => (
    <div>
        <h1>
            <TranslateMessage word="website->title->helloWorld" />
        </h1>
        <p>
            <TranslateMessage word="website->description" />
        </p>
    </div>
)


ReactDOM.render(
    <StrictMode>
        <TranslateProvider userConfig={{
            locale: "ru",
            fallbackLng: "en",
            separator: "->",
            messages: {
                website: {
                    title: {
                        helloWorld: {
                            en: "Hello World !",
                            fr: "Bonjour à tous !"
                        }
                    },
                    description: {
                        en: "This is my first website :o",
                        fr: "Ceci est mon premier site web :o"
                    }
                }
            }
        }}>
            <App />
        </TranslateProvider>
    </StrictMode>,
    document.getElementById("app")
);
