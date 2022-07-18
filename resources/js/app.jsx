import './bootstrap';
import './IconLibrary';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import TopFrame from './Layouts/TopFrame';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const page = require(`./Pages/${name}`).default;
        page.layout ??= page => <TopFrame>{page}</TopFrame>;
        return page;
    },
    setup({ el, App, props }) {
        return render(
            <App {...props} />, el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
