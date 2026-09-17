# Empacota o conteudo de out/ em deploy-juliaalvesaraujo.zip, pronto para
# upload no cPanel (Gerenciador de Arquivos -> Extrair).
#
# Uso: npm run deploy:zip
# (roda "next build" antes, se out/ nao existir ou --build for passado)
#
# Por que nao usar Compress-Archive: ele grava os caminhos internos do zip
# com "\" em vez de "/". O formato ZIP exige "/", e ferramentas de extracao
# em Linux (como a do cPanel) podem tratar "_next\static\..." como um nome
# de arquivo literal em vez de criar as pastas. Por isso o zip e montado
# manualmente aqui, forcando "/" em cada entrada.

param(
    [switch]$Build
)

$ErrorActionPreference = "Stop"

$outDir = Join-Path $PSScriptRoot "..\out"
$zipPath = Join-Path $PSScriptRoot "..\deploy-juliaalvesaraujo.zip"

if ($Build -or -not (Test-Path $outDir)) {
    Write-Output "-> Rodando npm run build..."
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build falhou. Corrija os erros antes de gerar o zip."
        exit 1
    }
}

if (-not (Test-Path $outDir)) {
    Write-Error "Pasta out/ nao encontrada mesmo apos o build."
    exit 1
}

Remove-Item $zipPath -Force -ErrorAction SilentlyContinue

Add-Type -AssemblyName System.IO.Compression

$outDir = (Resolve-Path $outDir).Path
$fs = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $outDir -Recurse -File
foreach ($file in $files) {
    $relative = $file.FullName.Substring($outDir.Length + 1).Replace('\', '/')
    $entry = $archive.CreateEntry($relative, [System.IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    $fileStream = [System.IO.File]::OpenRead($file.FullName)
    $fileStream.CopyTo($entryStream)
    $fileStream.Dispose()
    $entryStream.Dispose()
}

$archive.Dispose()
$fs.Dispose()

$sizeMb = [Math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Output "OK: deploy-juliaalvesaraujo.zip gerado ($($files.Count) arquivos, $sizeMb MB)"
Write-Output "Envie para public_html no cPanel e use 'Extrair'."
