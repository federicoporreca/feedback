import styled from 'styled-components';
import { Button, Icon } from 'antd';

export const ToggleButton = styled(Button)`
    && {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        padding-top: 2px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);

    }
`;

export const ShowIcon = styled(Icon)`
    font-size: 32px;
`;

export const HideIcon = styled(Icon)`
    font-size: 24px;
`;

export const StyledDiv = styled.div`
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 300px;
    height: 362px;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

export const SubmitButton = styled(Button)`
    float: right;
`;  