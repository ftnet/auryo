import { ConfigState, setConfigKey } from "@common/store/config";
import * as React from "react";

interface Props {
    config: ConfigState;
    setConfigKey: typeof setConfigKey;
    configKey: string;
    name: string;
    data: { k: string; v: any }[];
    className?: string;
    usePlaceholder: boolean;
    onChange?(value: string): void;
}

class SelectConfig extends React.PureComponent<Props> {

    public static readonly defaultProps: Partial<Props> = {
        usePlaceholder: false,
        className: "",
        data: []
    };

    public handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const { configKey, setConfigKey, onChange } = this.props;

        setConfigKey(configKey, e.currentTarget.value);

        if (onChange) {
            onChange(e.currentTarget.value);
        }
    }


    public render() {
        const { configKey, name, config, className, usePlaceholder, data } = this.props;

        const value = configKey.split(".").reduce((o, i) => o[i], config);

        return (
            <div className={`setting d-flex justify-content-between align-items-center ${className}`}>
                {
                    !usePlaceholder && <span>{name}</span>}
                <select
                    className="form-control form-control-sm"
                    onBlur={this.handleChange}
                    defaultValue={value || ""}
                >
                    {
                        data.map(({ k, v }) => (
                            <option value={v} key={k} role="option" aria-selected={false}>{k}</option>
                        ))}
                </select>
            </div>
        );
    }

}

export default SelectConfig;
