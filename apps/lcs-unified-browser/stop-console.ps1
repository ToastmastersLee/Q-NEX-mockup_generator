$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$config = if ($env:LCS_DEMO_CONFIG) { $env:LCS_DEMO_CONFIG } else { 'config.local.json' }
if (-not (Test-Path -LiteralPath $config)) { $config = 'config.example.json' }
$settings = Get-Content -Raw -Encoding UTF8 -LiteralPath $config | ConvertFrom-Json
$port = if ($null -eq $settings.port) { 8088 } else { [int]$settings.port }
$listeners = @(Get-NetTCPConnection -State Listen -ErrorAction Stop |
    Where-Object LocalPort -eq $port | Select-Object -ExpandProperty OwningProcess -Unique)
if ($listeners.Count -eq 0) { Write-Output "Console already stopped (port $port)."; exit 0 }
if ($listeners.Count -ne 1) { throw "Multiple listeners use port $port." }

$listener = Get-CimInstance Win32_Process -Filter "ProcessId=$($listeners[0])"
$python = [regex]::Escape((Join-Path $PSScriptRoot '.venv\Scripts\python.exe'))
$entry = [regex]::Escape((Join-Path $PSScriptRoot 'app.py'))
$prefix = "^\s*`"?$python`"?\s+(?:-B\s+)?"
$current = $listener.CommandLine -match ($prefix + "`"?$entry`"?\s*$")
$legacy = $listener.CommandLine -match ($prefix + '"?app\.py"?\s*$')
if (-not ($current -or $legacy)) { throw "Port $port belongs to a different application." }

$process = Get-Process -Id $listener.ProcessId
# Retain a handle so WaitForExit observes this process even if the PID is reused.
$null = $process.Handle
if ($current) {
    $event = [Threading.EventWaitHandle]::OpenExisting("Local\IQVideo.Console.Stop.$($process.Id)")
    try { $null = $event.Set() } finally { $event.Dispose() }
} else {
    # Older start.cmd used a relative app.py and did not create the shutdown event.
    $page = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$port/" -TimeoutSec 4
    if ($page.Content -notmatch '/static/console\.js') { throw 'Could not identify the legacy console.' }
    & taskkill.exe /PID $process.Id /T /F
    if ($LASTEXITCODE -ne 0 -and -not $process.HasExited) { throw 'Legacy console did not exit.' }
}
if (-not $process.WaitForExit(20000)) { throw "Console shutdown on port $port timed out." }
Write-Output "Console stopped (port $port)."
