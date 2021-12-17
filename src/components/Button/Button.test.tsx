import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import Button from './Button';

describe('Button', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <Button/>
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
