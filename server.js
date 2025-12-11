const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const app = express();
const PORT = 3000;

const CONFIG_PATH = path.join(process.env.HOME, 'Library/Application Support/OpenTabletDriver/settings.json');
const DAEMON_PATH = '/Applications/OpenTabletDriver.app/Contents/MacOS/OpenTabletDriver.Daemon';

app.use(bodyParser.json());
app.use(express.static('public'));

// Get Settings
app.get('/api/settings', (req, res) => {
    if (!fs.existsSync(CONFIG_PATH)) {
        return res.status(404).json({ error: 'Config file not found' });
    }
    fs.readFile(CONFIG_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read config' });
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.status(500).json({ error: 'Invalid JSON in config' });
        }
    });
});

// Save Settings
app.post('/api/settings', (req, res) => {
    const newSettings = req.body;
    fs.writeFile(CONFIG_PATH, JSON.stringify(newSettings, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Failed to write config' });
        restartDaemon((restartErr) => {
            if (restartErr) {
                console.error('Restart error:', restartErr);
                return res.status(500).json({ error: 'Settings saved but daemon failed to restart' });
            }
            res.json({ success: true, message: 'Settings saved and driver restarted' });
        });
    });
});

// Restart Driver
app.post('/api/restart', (req, res) => {
    restartDaemon((err) => {
        if (err) return res.status(500).json({ error: 'Failed to restart daemon' });
        res.json({ success: true });
    });
});

// Status
app.get('/api/status', (req, res) => {
    exec('pgrep -f OpenTabletDriver.Daemon', (err, stdout) => {
        res.json({ running: !err && stdout.trim().length > 0 });
    });
});

function restartDaemon(callback) {
    console.log('Restarting daemon...');
    // Kill existing
    exec('pkill -f OpenTabletDriver.Daemon', (err) => {
        // Ignore error if process not found
        setTimeout(() => {
            // Start new
            const daemon = spawn(DAEMON_PATH, [], {
                detached: true,
                stdio: 'ignore'
            });
            daemon.unref();
            console.log('Daemon started');
            callback(null);
        }, 1000);
    });
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
