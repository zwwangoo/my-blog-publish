
# GitHub Publisher - Obsidian Plugin

本项目基于 deepseek 自动生成95%以上代码

## 简介
GitHub Publisher 是一个 Obsidian 插件，允许你将笔记直接发布到 GitHub 仓库。通过简单的配置，你可以将选中的笔记发布到指定的 GitHub 仓库中，并自动处理文件的创建和更新。非常适合博客作者、开发者以及需要将 Obsidian 笔记与 GitHub 集成的用户。

## 功能
- **配置 GitHub 仓库**：支持配置仓库地址、分支名称和 GitHub Token。
- **一键发布笔记**：将当前笔记发布到配置的 GitHub 仓库中。
- **自动处理文件更新**：如果文件已存在，自动更新文件；如果文件不存在，自动创建新文件。

## 安装
### 通过 Obsidian 社区插件市场安装
1. 打开 Obsidian 设置，进入“社区插件”选项卡。
2. 点击“浏览”按钮，搜索“GitHub Publisher”。
3. 找到插件后，点击“安装”按钮。
4. 安装完成后，点击“启用”按钮。

### 手动安装
1. 从 [GitHub 发布页面](https://github.com/zwwangoo/my-blog-publish/releases) 下载最新版本的插件文件（`.zip` 或 `.tar.gz`）。
2. 解压文件，将解压后的文件夹复制到 Obsidian 的插件目录（`<vault>/.obsidian/plugins/`）。
3. 重启 Obsidian，在“社区插件”中启用插件。

## 使用方法
1. **配置插件**：
   - 打开 Obsidian 设置，进入“GitHub Publisher”选项卡。
   - 配置以下信息：
     - **GitHub Repository**：GitHub 仓库地址，格式为 `username/repo`。
     - **GitHub Branch**：发布到的分支名称，默认为 `main`。
     - **GitHub Token**：GitHub Personal Access Token，需具有 `repo` 权限。
2. **发布笔记**：
   - 打开要发布的笔记。
   - 点击左侧边栏的“发布”按钮，或运行命令“Publish Note to GitHub”。
   - 插件会将笔记发布到配置的 GitHub 仓库中。

## 开发指南
### 环境准备
1. 确保已安装 Node.js 和 npm。
2. 克隆本仓库到本地：
   ```bash
   git clone https://github.com/zwwangoo/my-blog-publish/obsidian-github-publisher.git
   cd obsidian-github-publisher
   ```
3. 安装依赖：
   ```bash
   npm install
   ```

### 构建插件
1. 修改代码后，运行以下命令构建插件：
   ```bash
   npm run build
   ```
2. 构建完成后，插件文件会生成在 `dist` 目录中。

### 调试插件
1. 在 Obsidian 中启用开发者模式。
2. 打开“开发者工具”（`Ctrl+Shift+I` 或 `Cmd+Option+I`），查看控制台日志。
3. 使用 `console.log` 打印调试信息。

### 发布插件
1. 更新 `manifest.json` 中的版本号。
2. 提交代码并创建新的 GitHub 发布版本。
3. 将插件提交到 Obsidian 社区插件市场（参考 [官方指南](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)）。

## 配置项
| 配置项            | 描述                                                                 |
|-------------------|--------------------------------------------------------------------|
| GitHub Repository | GitHub 仓库地址，格式为 `username/repo`。                           |
| GitHub Branch     | 发布到的分支名称，默认为 `main`。                                   |
| GitHub Token      | GitHub Personal Access Token，需具有 `repo` 权限。                  |

## 常见问题
### 1. 发布失败，提示 `403` 错误
- 确保 GitHub Token 具有 `repo` 权限。
- 检查仓库地址和分支名称是否正确。

### 2. 发布失败，提示 `404` 错误
- 确保仓库地址和分支名称正确。
- 确保目标路径存在。

### 3. 插件无法加载
- 确保插件已正确安装并启用。
- 检查 Obsidian 版本是否满足插件的最低要求。

## 贡献
欢迎提交 Issue 和 Pull Request！如果你有任何问题或建议，请通过 [GitHub Issues](https://github.com/zwwangoo/my-blog-publish/issues) 反馈。

## 许可证
本项目基于 [MIT 许可证](LICENSE) 开源。
