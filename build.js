const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// 将 exec 函数封装为返回 Promise 的函数
function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

// 读取并更新包配置文件中的版本号
function updateVersion() {
  const packagePath = path.join(__dirname, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath));
  const version = packageData.version.split('.');
  version[2] = parseInt(version[2]) + 1;
  packageData.version = version.join('.');
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  return packageData.version;
}

// 检查文件是否存在
function checkFileExists(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (error) => {
      resolve(!error);
    });
  });
}

// 等待文件出现
async function waitForFile(filePath) {
  let fileExists = await checkFileExists(filePath);
  while (!fileExists) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    fileExists = await checkFileExists(filePath);
  }
}

// 执行复制和打包操作
async function copyAndPackage() {
	try{
		await execAsync('rmdir /S /Q ".\\bin\\Release\\node14-win-x64\\dist"');
	}catch (error){
		console.error(`exec error: ${error}`);
	}
    await execAsync('del ".\\bin\\Release\\node14-win-x64\\EocScript"');
    const { stdout: copyStdout, stderr: copyStderr } = await execAsync('xcopy /E /I /Y "./dist" "./bin/Release/node14-win-x64/dist"');
    console.log(`stdout: ${copyStdout}`);
	if(copyStderr)
		console.error(`stderr: ${copyStderr}`);
    const { stdout: pkgStdout, stderr: pkgStderr } = await execAsync('pkg app.js --targets node14-win-x64 --output ./bin/Release/node14-win-x64/EocScript.exe');
    console.log(`stdout: ${pkgStdout}`);
	if(pkgStderr)
		console.error(`stderr: ${pkgStderr}`);
    // 等待 EocScript.exe 文件出现
    await waitForFile(path.join(__dirname, 'bin', 'Release', 'node14-win-x64', 'EocScript.exe'));
}

// 压缩指定文件夹并命名为所需格式
const archiver = require('archiver');
async function compressFolder(version) {
  const folderName = 'node14-win-x64';
  const zipName = 'EocScript-node14-win-x64'
  const folderPath = path.join(__dirname, 'bin', 'Release', folderName);
  const outputPath = path.join(__dirname, 'bin', 'Release',`${zipName}-${version}.zip`);
  try {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
    archive.pipe(output);
    archive.directory(folderPath, false);
    await archive.finalize();
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
}

async function main() {
  const version = updateVersion();
  await copyAndPackage();
  await compressFolder(version);
}

main();