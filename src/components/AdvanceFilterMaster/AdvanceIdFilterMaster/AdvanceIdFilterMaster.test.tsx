import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import AdvanceIdFilter from './AdvanceIdFilter';

describe('AdvanceIdFilter', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <AdvanceIdFilter/>
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
