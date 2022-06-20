import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
    }
    export interface LightTheme {
        textColor: string;
        bgColor: string;
    }
    export interface DarkTheme {
        textColor: string;
        bgColor: string;
    }
}
