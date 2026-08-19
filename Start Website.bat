@echo off
echo Starting HK Realty Development Server...
echo This will open a local web server at http://localhost:3000
echo.
echo NOTE: Since npm install had some network timeouts, this script bypasses standard NPM and runs Next.js directly.
echo.
start http://localhost:3000
node node_modules/next/dist/bin/next dev
if %errorlevel% neq 0 (
    echo.
    echo An error occurred starting the server. Please check the logs above.
    pause
)
