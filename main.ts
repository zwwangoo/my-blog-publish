import { App, Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import simpleGit, { SimpleGit } from 'simple-git';
import * as fs from 'fs';

export default class MyPlugin extends Plugin {
  async onload() {
    // 添加一个命令，用于发布选中的笔记
    this.addCommand({
      id: 'publish-note',
      name: 'Publish Note to Blog',
      callback: () => this.publishNote(),
    });

    // 添加一个按钮到侧边栏
    this.addRibbonIcon('upload-cloud', 'Publish Note', (evt: MouseEvent) => {
      this.publishNote();
    });
  }

  async publishNote() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice('No active note found!');
      return;
    }

    // 定义目标路径（blog-src仓库的路径）
    const blogSrcPath = '/Users/wen/projects/blog-src/source/_posts'; // 修改为你的实际路径
    const targetPath = `${blogSrcPath}/${file.name}`;
	console.log("Target path:", targetPath); // 调试路径

    // 读取笔记内容
    const content = await this.app.vault.read(file);

    // 将笔记复制到blog-src仓库
	fs.writeFileSync(targetPath, content);

    // 使用simple-git提交并推送更改
    const git: SimpleGit = simpleGit(blogSrcPath);
    try {
      await git.add(targetPath);
      await git.commit(`Publish note: ${file.name}`);
      await git.push();
      new Notice('Note published successfully!');
    } catch (error) {
      new Notice('Failed to publish note. Check the console for details.');
      console.error(error);
    }
  }
}