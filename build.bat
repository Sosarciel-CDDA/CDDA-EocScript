@echo off

rem 编译 TypeScript 代码
tsc

rem 复制非 TypeScript 文件
rem for /R src %%f in (*.*) do (
rem     if not "%%~xf" == ".ts" (
rem         xcopy /D /Y "%%f" "dist\%%f"
rem     )
rem )
pause