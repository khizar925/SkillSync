# Usage: .\scripts\commit.ps1 "your commit message"
# Or:    .\scripts\commit.ps1  (uses auto-generated message from git diff)

param(
    [string]$Message = ""
)

Set-Location (Split-Path $PSScriptRoot -Parent)

# Show what will be committed
Write-Host "`n=== Changes to commit ===" -ForegroundColor Cyan
git status --short

# Auto-generate message if none provided
if (-not $Message) {
    $changed = git diff --name-only HEAD 2>$null
    $untracked = git ls-files --others --exclude-standard 2>$null
    $allFiles = ($changed + $untracked) | Where-Object { $_ } | Select-Object -First 5
    $fileList = $allFiles -join ", "
    if (-not $fileList) { $fileList = "updates" }
    $Message = "update: $fileList"
}

Write-Host "`nCommit message: $Message" -ForegroundColor Yellow

# Stage all tracked + untracked (respects .gitignore)
git add -A

# Commit
git commit -m $Message

# Push if remote exists
$remote = git remote 2>$null
if ($remote) {
    $branch = git branch --show-current
    Write-Host "`nPushing to origin/$branch..." -ForegroundColor Cyan
    git push origin $branch
    Write-Host "Done. Pushed to origin/$branch." -ForegroundColor Green
} else {
    Write-Host "`nNo remote set. Committed locally only." -ForegroundColor Yellow
    Write-Host "To add remote: git remote add origin <url>" -ForegroundColor Gray
}
