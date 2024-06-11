import path from "node:path";
import fs from "node:fs";

// 文件根目录
const DIR_PATH = path.resolve("docs");
// 白名单
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
];

// 判断是否是文件夹
const isDirectory = (directoryPath) =>
  fs.lstatSync(directoryPath).isDirectory();

// 判断文件夹内是否至少有一个md文件
const directoryHasMarkdown = (directoryPath) => {
  const filesInDirectory = fs.readdirSync(directoryPath);
  return filesInDirectory.some((file) => {
    const fullPath = path.join(directoryPath, file);
    return isDirectory(fullPath)
      ? directoryHasMarkdown(fullPath)
      : path.extname(file) === ".md";
  });
};

// 把方法导出直接使用
function getList(params, path1, pathname) {
  const res = [];
  // 过滤掉白名单内的文件和文件夹
  const filteredParams = params.filter((p) => !WHITE_LIST.includes(p));

  // 遍历过滤后的文件和文件夹
  for (let file of filteredParams) {
    const dirPath = path.join(path1, file);
    if (isDirectory(dirPath) && directoryHasMarkdown(dirPath)) {
      const nestedFiles = fs.readdirSync(dirPath);
      res.push({
        text: file,
        collapsible: true,
        items: getList(nestedFiles, dirPath, `${pathname}/${file}`),
      });
    } else if (path.extname(file) === ".md") {
      const name = path.basename(file, ".md");
      let linkPath = `${pathname}/${name}`
        .replace(/^\//, "")
        .replace(/^docs\//, "/");
      res.push({
        text: name,
        link: linkPath,
      });
    }
  }
  return res;
}

export const set_sidebar = (pathname) => {
  const dirPath = path.join(DIR_PATH, pathname);
  const files = fs.readdirSync(dirPath);
  return getList(files, dirPath, pathname);
};
