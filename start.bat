@echo off
echo.
echo  ██████╗ ██████╗ ██╗███╗   ███╗███████╗██████╗ ██╗██████╗ ███████╗
echo  ██╔══██╗██╔══██╗██║████╗ ████║██╔════╝██╔══██╗██║██╔══██╗██╔════╝
echo  ██████╔╝██████╔╝██║██╔████╔██║█████╗  ██████╔╝██║██║  ██║█████╗
echo  ██╔═══╝ ██╔══██╗██║██║╚██╔╝██║██╔══╝  ██╔══██╗██║██║  ██║██╔══╝
echo  ██║     ██║  ██║██║██║ ╚═╝ ██║███████╗██║  ██║██║██████╔╝███████╗
echo  ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝
echo.
echo  Starting PrimeRide...
echo  Express API  -^>  http://localhost:3001
echo  Vue App      -^>  http://localhost:5173
echo.

start "PrimeRide API" cmd /k "cd /d %~dp0server && node index.js"
timeout /t 2 /nobreak > nul
start "PrimeRide App" cmd /k "cd /d %~dp0client && npm run dev"
timeout /t 4 /nobreak > nul
start http://localhost:5173

echo  Both servers started! Browser opening...
pause
