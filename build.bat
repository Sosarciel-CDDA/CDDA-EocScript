rem pkg app.js --targets node14-win-x64 --output ./bin/Release/node14-win-x64/EocScript.exe
xcopy /E /I /Y "./dist" "./bin/Release/node14-win-x64/dist"
pause