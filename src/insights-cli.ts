import { ICppStyleConfig, Tokens, ICppTransformationConfig, CppStandards, ICppInsightsConfig } from "./insights.model";

export class InsightsConfigurator {
    private static getStyleArgs(config: ICppStyleConfig): string {
        return InsightsConfigurator.joinArgs(
            config.forAsWhile ? Tokens.ALT_SYNTAX_FOR : null,
            config.arraySubscription ? Tokens.ALT_SYNTAX_SUB : null,
        );
    }

    private static getTransformArgs(config: ICppTransformationConfig): string {
        return InsightsConfigurator.joinArgs(
            config.implicitCasts ? Tokens.IMPLICIT_CAST : null,
        );
    }

    private static getStdArgs(config: CppStandards) {
        return InsightsConfigurator.joinArgs(
            `-std=${config}`
        );
    }

    public static getArgs(config: ICppInsightsConfig, source: string) {
        return InsightsConfigurator.joinArgs(
            InsightsConfigurator.getTransformArgs(config.transformations),
            InsightsConfigurator.getStyleArgs(config.styles),
            source,
            '--',
            InsightsConfigurator.getStdArgs(config.standard),
        );
    }

    private static joinArgs(...args: (string | null)[]) {
        return args.join(' ');
    }
}