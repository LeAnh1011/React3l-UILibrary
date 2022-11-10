import React from 'react';
import { Checkbox as CheckboxAntd } from 'antd';
import './Checkbox.scss';

export interface CheckboxProps {
    onChange?: (
        value: boolean,
    ) => void;

    checked?: boolean;
    disabled?: boolean;
    label?: string
}

function Checkbox(props: CheckboxProps) {
    const { onChange, checked, disabled, label } = props;
    const handleChange = React.useCallback(
        value => {
            if (onChange && typeof onChange === 'function') {
                return onChange(value.target.checked);
            }
            return;
        },
        [onChange],
    );

    return <div className='checkbox__container'>
        <CheckboxAntd checked={checked} onChange={handleChange} disabled={disabled} >{label}</CheckboxAntd>
    </div>;
}

export default Checkbox;
