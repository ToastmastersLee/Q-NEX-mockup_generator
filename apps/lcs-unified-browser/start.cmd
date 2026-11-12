@echo off
setlocal
cd /d "%~dp0"
set "LCS_VENV_PY=%~dp0.venv\Scripts\python.exe"
if /i "%~1"=="--setup" goto setup
if not exist "%LCS_VENV_PY%" goto missing
"%LCS_VENV_PY%" -c "import fastapi, uvicorn, httpx" >nul 2>&1
if errorlevel 1 goto missing
"%LCS_VENV_PY%" app.py
exit /b %errorlevel%

:setup
if exist "%LCS_VENV_PY%" goto install
if not defined LCS_DEMO_PYTHON set "LCS_DEMO_PYTHON=%USERPROFILE%\MiniConda3\python.exe"
if not exist "%LCS_DEMO_PYTHON%" (
  echo Set LCS_DEMO_PYTHON to the full path of your Python 3.11+ executable.
  exit /b 1
)
"%LCS_DEMO_PYTHON%" -m venv .venv
if errorlevel 1 exit /b 1
:install
"%LCS_VENV_PY%" -m pip install -r requirements.txt
exit /b %errorlevel%

:missing
echo Run start.cmd --setup first.
exit /b 1
