$content = @'
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    },
    "manim-server": {
      "command": "python",
      "args": [
        "C:\\Users\\谢平\\Documents\\manim-mcp-server\\src\\manim_server.py"
      ],
      "env": {
        "MANIM_EXECUTABLE": "C:\\Users\\谢平\\AppData\\Local\\Programs\\Python\\Python312\\Scripts\\manim.exe"
      }
    },
    "blender": {
      "command": "uvx",
      "args": [
        "blender-mcp"
      ]
    }
  }
}
'@

$content | Out-File -FilePath "$HOME\.cursor\mcp.json" -Encoding utf8
Write-Host "File updated successfully." 