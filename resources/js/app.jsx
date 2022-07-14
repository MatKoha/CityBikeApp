import './bootstrap';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import TopFrame from './Layouts/TopFrame';
import Header from './Components/Header';
import Footer from './Components/Footer';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(
            <TopFrame>
                <Header />
                <App {...props} />
                <Footer />
            </TopFrame>, el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
