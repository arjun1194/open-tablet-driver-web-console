# Open Tablet Driver Web Console

A simple, lightweight web interface for configuring [OpenTabletDriver](https://opentabletdriver.net/) settings. This tool provides an easy-to-use GUI for mapping buttons, adjusting tablet area sensitivity, and restarting the driver daemon, specifically tailored for macOS (but adaptable for Linux).

## Features

- **Driver Status Monitoring**: Real-time check if the OpenTabletDriver Daemon is running.
- **Button Mapping**: Easily configure pen buttons to common actions:
  - Default (Button 1/2)
  - Eraser
  - Tip (Left Click)
  - Right Click
  - Middle Click
- **Area Configuration**: Adjust the active tablet area (Width, Height, X/Y Offsets) to fine-tune sensitivity and aspect ratio.
- **Quick Restart**: Restart the driver daemon directly from the web interface to apply changes immediately.

## Prerequisites

- [Node.js](https://nodejs.org/) (Installed and available in your PATH)
- [OpenTabletDriver](https://opentabletdriver.net/) (Installed in `/Applications/OpenTabletDriver.app` for macOS)

## Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arjun1194/open-tablet-driver-web-console.git
    cd open-tablet-driver-web-console
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```
    *(Note: You might need to use `sudo` or run it in a way that allows it to manage the OpenTabletDriver process, though standard user permissions often suffice for the daemon interface).*

4.  **Open the console:**
    Navigate to `http://localhost:3000` in your web browser.

## Configuration

The application reads and writes directly to the standard OpenTabletDriver `settings.json` file located at:
`~/Library/Application Support/OpenTabletDriver/settings.json`

## License

ISC
