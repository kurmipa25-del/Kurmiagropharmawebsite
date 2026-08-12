$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running on http://localhost:8080/"

$rootDir = "C:\Users\admin\.gemini\antigravity-ide\scratch\kurmi-pharmagro-website"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        
        $rawPath = $req.Url.AbsolutePath.TrimStart('/')
        if ([string]::IsNullOrEmpty($rawPath)) {
            $rawPath = "index.html"
        }
        
        $filePath = [System.IO.Path]::Combine($rootDir, $rawPath)
        
        if ([System.IO.File]::Exists($filePath)) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            
            switch ($ext) {
                ".html" { $res.ContentType = "text/html; charset=utf-8" }
                ".css"  { $res.ContentType = "text/css" }
                ".js"   { $res.ContentType = "application/javascript" }
                ".png"  { $res.ContentType = "image/png" }
                ".jpg"  { $res.ContentType = "image/jpeg" }
                ".svg"  { $res.ContentType = "image/svg+xml" }
                default { $res.ContentType = "application/octet-stream" }
            }
            
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
        } else {
            $res.StatusCode = 404
            $res.OutputStream.Close()
        }
    } catch {
        # continue listening
    }
}
