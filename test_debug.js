console.log('Starting...');
try {
    const express = require('express');
    console.log('Express loaded');
    const app = express();
    app.listen(3000, () => console.log('Test Running'));
} catch (e) {
    console.error('Error:', e);
}
