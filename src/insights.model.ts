export enum CppStandards {
    cpp98 = 'c++98', 
    cpp11 = 'c++11', 
    cpp14 = 'c++14', 
    cpp17 = 'c++17', 
    cpp2a = 'c++2a',
}

export interface ICppStyleConfig {
    forAsWhile: boolean,
    arraySubscription: boolean,
}

export interface ICppTransformationConfig {
    implicitCasts: boolean,
}

export interface ICppInsightsConfig {
    binary: string,
    standard: CppStandards,
    styles: ICppStyleConfig,
    transformations: ICppTransformationConfig,
}

export enum Tokens {
    CONFIG_TOKEN = 'cppinsights',
    ALT_SYNTAX_FOR = '-alt-syntax-for',
    ALT_SYNTAX_SUB = '-alt-syntax-subscription',
    IMPLICIT_CAST = '-show-all-implicit-casts',
    DIFF_COMMAND = 'vscode.diff',
    INSIGHTS = 'Cpp Insights'
}