let smartgrid = require('smart-grid');

let settings = {
    outputStyle: 'scss',
    columns: 12,
    offset: '16px',
    mobileFirst: false,
    container: {
        maxWidth: '1170px',
        fields: '0'
    },
    breakPoints: {
        lm: {
            width: '1240px',
            fields: '60px'
        },
        xlm: {
            width: '1024px',
            fields: '60px'
        },
        md: {
            width: '980px',
            fields: '32px'
        },
        sm: {
            width: '768px',
            fields: '32px'
        },
        xxs: {
            width: '668px',
            fields: '16px'
        },
        xs: {
            width: '360px',
            fields: '16px'
        }
    }
};

smartgrid('./src/baseStyles', settings);


/*
 * mobileFirst
 *  false -> max-width
 *  true -> min-width
 */
