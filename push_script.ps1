$remoteUrl = "https://github.com/ashishmishra3648/VogueVista"

# 1. Reset any staged changes to ensure we respect the new gitignore
git reset

# 2. Get status of untracked and modified files
# The new gitignore should now hide public/images/images/
$statusOutput = git status --porcelain -u

if (-not $statusOutput) {
    Write-Host "No changes to commit."
    exit
}

# 3. Process files one by one
foreach ($line in $statusOutput) {
    # porcelain format: XY Path
    # We want the path, which starts at index 3
    $file = $line.Substring(3).Trim('"')
    
    # helper check to ensure we don't push the ignored folder if gitignore didn't catch it for some reason
    if ($file -match "public/images/images") { 
        Write-Host "Skipping ignored file: $file"
        continue 
    }

    Write-Host "Processing: $file"
    
    git add "$file"
    git commit -m "Add $file"
    
    # Push immediately
    git push origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Push failed for $file. Trying to pull and push..."
        git pull origin main --rebase
        git push origin main
    }
}

Write-Host "Done."
