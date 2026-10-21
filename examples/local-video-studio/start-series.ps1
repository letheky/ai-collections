$ErrorActionPreference='Stop'
$env:PYTHONUTF8='1'
$root=$PSScriptRoot
Add-Type -Namespace VideoStudioQueue -Name Awake -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint flags);'
[VideoStudioQueue.Awake]::SetThreadExecutionState([uint32]2147483649) | Out-Null
try {
    python (Join-Path $root 'studio.py') prepare
    if ($LASTEXITCODE -ne 0) { throw 'Preparation failed' }
    python (Join-Path $root 'studio.py') queue
    if ($LASTEXITCODE -ne 0) { throw 'Series queue failed; inspect the episode logs' }
} finally {
    [VideoStudioQueue.Awake]::SetThreadExecutionState([uint32]2147483648) | Out-Null
}
