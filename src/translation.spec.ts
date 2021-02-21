import TestRenderer from "react-test-renderer";
import {renderHook} from "@testing-library/react-hooks";
import {useLanguage, useTranslation} from "./translation";
const {act} = TestRenderer;


describe("translation", (): void => {
    describe("test useLanguage", (): void => {
        it("should be equal to en", (): void => {
            expect.assertions(1);
            const {result} = renderHook(() => useLanguage());
            const [lang] = result.current;
            expect(lang).toStrictEqual("en");
        });

        it("should be equal to gb", (): void => {
            expect.assertions(1);
            const {result} = renderHook(() => useLanguage("gb"));
            const [lang] = result.current;
            expect(lang).toStrictEqual("gb");
        });

        it("should be set a new lang", (): void => {
            expect.assertions(1);
            const {result} = renderHook(() => useLanguage("gb"));
            const [, setLang] = result.current;
            act(() => setLang("ir"));
            expect(window.localStorage.getItem("lang")).toStrictEqual("ir");
        });
    });


    describe("test useTranslation", (): void => {
        it("should don't have key", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "production";
            const {result} = renderHook(() => useLanguage("en"));
            const [lang] = result.current;

            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("", lang)).toStrictEqual("");
        });

        it("should don't have translation on prod", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "production";
            const {result} = renderHook(() => useLanguage("en"));
            const [lang] = result.current;

            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("hello", lang)).toStrictEqual("");
        });


        it("should don't have translation on dev", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const {result} = renderHook(() => useLanguage());
            const [lang] = result.current;
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("hello", lang)).toStrictEqual("TODO.hello.en");
        });

        it("should have translation but not for this language on prod", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "production";
            const {result} = renderHook(() => useLanguage("gb"));
            const [lang] = result.current;

            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("name", lang)).toStrictEqual("");
        });


        it("should have translation but not for this language on dev", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const {result} = renderHook(() => useLanguage("gb"));
            const [lang] = result.current;
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("name", lang)).toStrictEqual("TODO.name.gb");
        });

        it("should have translation", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const {result} = renderHook(() => useLanguage("en"));
            const [lang] = result.current;
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("name", lang)).toStrictEqual("Name");
        });

        it("should have translation recursive", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const {result} = renderHook(() => useLanguage("en"));
            const [lang] = result.current;
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.headers", lang)).toStrictEqual(["a", "b", "c"]);
        });

        it("should don't have translation recursive on development", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const {result} = renderHook(() => useLanguage("en"));
            const [lang] = result.current;
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.heaers", lang)).toStrictEqual("TODO.columns.heaers.en");
        });

        it("should don't have translation recursive on production", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "production";
            const {result} = renderHook(() => useLanguage("en"));
            const [lang] = result.current;
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.heaers", lang)).toStrictEqual("");
        });

        it("should get translation with an default language", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.headers", "fr")).toStrictEqual(["a", "b", "c"]);
        });

        it("should be return fallback if no translation on dev", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.headers", "f")).toStrictEqual("TODO.columns.headers.f");
        });

        it("should be return fallback if no translation on prod", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "production";
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.headers", "f")).toStrictEqual("");
        });

        it("should be return an another fallback if no translation on dev", (): void => {
            expect.assertions(1);
            process.env.NODE_ENV = "development";
            const resultTranlate = renderHook(() => useTranslation({
                name: {
                    en: "Name",
                    fr: "Nom"
                },
                columns: {
                    headers: {
                        en: ["a", "b", "c"],
                        fr: ["a", "b", "c"]
                    }
                }
            }));
            const translate = resultTranlate.result.current;
            expect(translate("columns.headers", "f", ".", "Translation missing")).toStrictEqual("Translation missing");
        });
    });
});
